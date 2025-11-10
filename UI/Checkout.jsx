import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TextInput,
    Alert,
    Linking,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import SimpleHeader from "../components/SimpleHeader";
import AddressWrapper from "../components/AddressWrapper";
import BreakLine from "../components/BreakLine";
import PaymentMethod from "../components/PaymentMethod";
import CheckoutButton from "../components/CheckoutButton";
import ProductCheckoutCard from "../components/ProductCheckoutCard";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Checkout({ navigation }) {
    const [notes, setNotes] = useState("");
    const route = useRoute();
    const selectedProducts = route.params?.selectedProducts ?? [];
    const { user } = useContext(AuthContext);
    const userId = user?._id;

    const totalOrder = selectedProducts.reduce((sum, item) => {
        const rawPrice = item.price ?? 0;
        const price =
            typeof rawPrice === "string"
                ? parseFloat(String(rawPrice).replace(/[^\d.]/g, "") || "0")
                : Number(rawPrice);
        return sum + price * (item.quantity || 1);
    }, 0);

    const handleCheckout = async () => {
        let orderData = null; // declare once

        try {
            console.log("🚀 Starting checkout flow...");

            // Step 1: Prepare selected items
            const selectedItems = selectedProducts.map((item, index) => {
                if (!item.productId && !item._id) {
                    console.warn(
                        `⚠️ Item ${index} missing product reference:`,
                        item
                    );
                }

                return {
                    product: item.productId || item._id,
                    quantity: item.quantity || 1,
                    status: "For approval",
                };
            });

            if (!selectedItems.length) {
                console.warn("⚠️ No valid items selected for checkout.");
                throw new Error("No valid items to checkout.");
            }

            // Step 2: Create GCash charge
            const createCharge = async () => {
                try {
                    console.log("💸 Creating GCash charge...");
                    const res = await fetch(
                        "https://api-motoxelerate.onrender.com/api/gcash",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                amount: totalOrder,
                                userId,
                            }),
                        }
                    );

                    const text = await res.text();
                    console.log(
                        "🧾 Raw GCash response:",
                        text,
                        "status:",
                        res.status,
                        "url:",
                        res.url
                    );

                    let data;
                    try {
                        data = JSON.parse(text);
                    } catch (err) {
                        console.error("❌ Failed to parse GCash JSON:", err);
                        throw new Error("Invalid GCash response format");
                    }

                    if (data.error) {
                        console.warn("⚠️ GCash error:", data.error);
                        throw new Error(
                            "GCash payment failed: " + String(data.error)
                        );
                    }

                    const {
                        reference_id,
                        charge_id,
                        paid_amount,
                        checkout_url,
                    } = data;

                    if (!reference_id || !charge_id || !checkout_url) {
                        console.warn(
                            "⚠️ Missing fields in GCash response:",
                            data
                        );
                        throw new Error("Missing GCash payment info");
                    }

                    return {
                        reference_id,
                        charge_id,
                        paid_amount,
                        checkout_url,
                    };
                } catch (err) {
                    console.error("❌ GCash charge creation failed:", err);
                    throw err;
                }
            };

            const { reference_id, charge_id, paid_amount, checkout_url } =
                await createCharge();

            // Step 3: Create order with embedded payment info
            const orderPayload = {
                userId,
                customerName:
                    `${user?.firstName} ${user?.lastName}` ||
                    "Unknown Customer",
                selectedItems,
                totalOrder,
                paymentMethod: "Gcash",
                notes,
                orderRequest: "For Approval",
                referenceId: reference_id,
                chargeId: charge_id,
                paidAmount: paid_amount || totalOrder,
                deliveryAddress: user?.address || "No address provided",
            };

            console.log("📦 Final order payload:", orderPayload);

            const orderRes = await fetch(
                "https://api-motoxelerate.onrender.com/api/order",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderPayload),
                }
            );

            // Defensive logs to determine frontend vs backend failure
            let orderText;
            try {
                orderText = await orderRes.text();
            } catch (err) {
                console.error("❌ Failed to read order response text:", err);
                throw new Error("Failed to read order response");
            }

            // Log everything helpful for debugging backend issues
            console.log("🧾 Raw order response text:", orderText);
            console.log(
                "🔍 order response status:",
                orderRes.status,
                "url:",
                orderRes.url
            );
            try {
                // try to surface headers where possible
                if (
                    orderRes.headers &&
                    typeof orderRes.headers.get === "function"
                ) {
                    console.log(
                        "🔍 order response content-type:",
                        orderRes.headers.get("content-type")
                    );
                }
            } catch (err) {
                console.warn("⚠️ Could not read headers:", err);
            }

            // parse the response (assign to outer-scoped orderData)
            try {
                orderData = JSON.parse(orderText);
            } catch (err) {
                // If parsing fails, log the raw text and rethrow a helpful error
                console.error("❌ Failed to parse order JSON:", err);
                console.log("🧩 orderText at parse error:", orderText);
                throw new Error(
                    "Invalid order response format (non-JSON). See orderText in console."
                );
            }

            // If backend returned an error payload, surface it clearly
            if (orderData?.error || !orderRes.ok || !orderData?._id) {
                console.warn(
                    "⚠️ Order creation failed:",
                    orderData?.error || orderData
                );
                // If the error string looks like JS runtime (e.g. "Cannot access 'newOrder' before initialization"),
                // this is a backend/server-side runtime issue.
                if (
                    typeof orderData?.error === "string" &&
                    /Cannot access|ReferenceError|TypeError|SyntaxError/.test(
                        orderData.error
                    )
                ) {
                    console.error(
                        "❌ Backend runtime error detected. This is server-side; send the following to backend dev:"
                    );
                    console.error("    status:", orderRes.status);
                    console.error("    rawResponse:", orderText);
                }
                // Surface the backend message to the user minimally and stop flow
                throw new Error(orderData?.error || "Order creation failed");
            }

            console.log("✅ Order created:", orderData._id);

            // Step 4: Redirect to GCash checkout
            try {
                Linking.openURL(checkout_url);
            } catch (err) {
                console.error(
                    "❌ Failed to open checkout URL:",
                    checkout_url,
                    err
                );
                // proceed — polling will likely fail but surface error
            }

            // Step 5: Poll backend for payment status using orderId
            const orderId = orderData._id;

            if (!orderId) {
                console.error(
                    "❌ orderData._id is missing — likely backend issue"
                );
                console.log("🧩 Full orderData object:", orderData);
                throw new Error("Order ID missing from backend response");
            }

            const pollInterval = setInterval(async () => {
                try {
                    const res = await fetch(
                        `https://api-motoxelerate.onrender.com/api/order/${orderId}`
                    );
                    if (!res.ok) {
                        console.warn(
                            "⚠️ Polling request not OK, status:",
                            res.status
                        );
                        return;
                    }
                    const order = await res.json();
                    const paymentStatus = order?.payment?.status;
                    const orderStatus = order?.status;

                    console.log("🔄 Polling order:", {
                        paymentStatus,
                        orderStatus,
                    });

                    if (
                        paymentStatus?.toUpperCase() === "SUCCEEDED" ||
                        orderStatus === "Processing"
                    ) {
                        clearInterval(pollInterval);
                        clearTimeout(timeout);
                        Alert.alert("✅ Payment successful!");
                        navigation.navigate("Tab", { screen: "Home" });
                    }

                    if (
                        paymentStatus?.toUpperCase() === "FAILED" ||
                        orderStatus === "Payment Failed"
                    ) {
                        clearInterval(pollInterval);
                        clearTimeout(timeout);
                        Alert.alert("❌ Payment failed", "Please try again.");
                        navigation.navigate("Tab", { screen: "Home" });
                    }
                } catch (err) {
                    console.warn("⚠️ Polling error:", err);
                }
            }, 3000);

            const timeout = setTimeout(() => {
                clearInterval(pollInterval);
                Alert.alert(
                    "⚠️ Payment timeout",
                    "We couldn't confirm your payment. Please try again."
                );
                navigation.navigate("Tab", { screen: "Home" });
            }, 120000);
        } catch (error) {
            console.error("❌ Checkout Error:", error);
            console.log("🧩 orderData at error time:", orderData);
            // Friendly message for users
            Alert.alert(
                "Order failed",
                "We couldn't create your order right now. We'll save the details and you can try again."
            );
        }
    };

    useEffect(() => {
        const handleDeepLink = ({ url }) => {
            if (url === "myapp://gcash-success") {
                Alert.alert(
                    "✅ Payment Successful",
                    `You paid ₱${totalOrder}. Thank you!`
                );
                navigation.navigate("Tab", { screen: "Home" });
            } else if (url === "myapp://gcash-failure") {
                Alert.alert(
                    "❌ Payment Failed",
                    "Your payment was not completed."
                );
            }
        };

        const subscription = Linking.addEventListener("url", handleDeepLink);

        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink({ url });
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <SimpleHeader goBack={() => navigation.goBack()} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 10 }}>
                    <AddressWrapper
                        nextIcon={require("../assets/Images/icons/next.png")}
                        address={user?.address || "No address provided"}
                    />
                </View>

                {selectedProducts.map((product) => (
                    <View key={product._id} style={{ marginVertical: 10 }}>
                        <ProductCheckoutCard product={product} />
                    </View>
                ))}

                <BreakLine />

                <Text style={[Fonts.subtext, { fontSize: 17 }]}>
                    Specification
                </Text>
                <Text style={[Fonts.regular, { marginTop: 18 }]}>
                    {selectedProducts[0]?.specification ||
                        "No specification available."}
                </Text>

                <BreakLine />

                <View style={{ marginTop: 15 }}>
                    <Text style={styles.label}>Leave a message to seller</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Message to seller"
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                </View>

                <View style={{ marginBottom: 45, marginTop: 20 }}>
                    <PaymentMethod
                        nextIcon={require("../assets/Images/icons/next.png")}
                        contact={user?.contact || "No contact provided"}
                    />
                </View>

                {selectedProducts.length >= 2 && (
                    <View
                        style={{
                            paddingHorizontal: 15,
                            marginTop: 28,
                            marginBottom: 10,
                            alignSelf: "flex-end",
                        }}
                    >
                        <Text style={[Fonts.subtext, styles.subtotal]}>
                            Sub Total
                        </Text>
                        {selectedProducts.map((item) => {
                            // ✅ Defensive log if price is missing
                            if (item.price === undefined) {
                                console.warn("⚠️ Missing price in item:", item);
                            }

                            // ✅ Safe price parsing
                            const rawPrice = item.price ?? 0;
                            const price =
                                typeof rawPrice === "string"
                                    ? parseFloat(
                                          String(rawPrice).replace(
                                              /[^\d.]/g,
                                              ""
                                          ) || "0"
                                      )
                                    : Number(rawPrice);

                            const subtotal = price * (item.quantity || 1);

                            return (
                                <Text
                                    key={item._id}
                                    style={[
                                        Fonts.semibold,
                                        styles.productPrice,
                                    ]}
                                >
                                    ₱ {subtotal.toLocaleString()}
                                </Text>
                            );
                        })}
                    </View>
                )}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <CheckoutButton
                        total={totalOrder}
                        selectedProducts={selectedProducts}
                        onBuy={handleCheckout}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 15,
    },
    label: {
        fontSize: 16,
        fontFamily: Fonts.subtext.fontFamily,
        marginBottom: 3,
        marginTop: 10,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#bbbbbbff",
        borderRadius: 8,
        fontSize: 13,
        paddingLeft: 10,
        marginHorizontal: 8,
        fontFamily: Fonts.regular.fontFamily,
        backgroundColor: "#fff",
        color: "#000",
    },
    subtotal: {
        fontSize: 16,
        color: Colors.test,
        textAlign: "right",
        marginBottom: 8,
    },
    productPrice: {
        color: Colors.secondary,
        fontSize: 15,
        textAlign: "right",
        marginBottom: 2,
    },
    buttonContainer: {
        backgroundColor: Colors.background,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    buttonWrapper: {
        height: 105,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
