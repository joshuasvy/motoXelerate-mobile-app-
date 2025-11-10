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
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

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
        try {
            // Step 1: Prepare selected items
            const selectedItems = selectedProducts.map((item) => {
                if (!item.productId && !item._id) {
                    console.warn("⚠️ Missing product reference in item:", item);
                }

                return {
                    product: item.productId || item._id,
                    quantity: item.quantity || 1,
                    status: "For approval",
                };
            });

            // Step 2: Create GCash charge
            const createCharge = async () => {
                const res = await fetch(
                    "https://api-motoxelerate.onrender.com/api/gcash",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ amount: totalOrder, userId }),
                    }
                );

                const text = await res.text();
                console.log("🧾 Raw GCash response:", text);

                let data;
                try {
                    data = JSON.parse(text);
                } catch (err) {
                    console.error("❌ Failed to parse GCash JSON:", err);
                    throw new Error("Invalid GCash response format");
                }

                if (data.error) {
                    console.warn("⚠️ GCash error:", data.error);
                    throw new Error("GCash payment failed");
                }

                const { reference_id, charge_id, paid_amount, checkout_url } =
                    data;

                if (!reference_id || !charge_id || !checkout_url) {
                    console.warn("⚠️ Missing fields in GCash response:", data);
                    throw new Error("Missing GCash payment info");
                }

                return { reference_id, charge_id, paid_amount, checkout_url };
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

            const orderText = await orderRes.text();
            console.log("🧾 Raw order response:", orderText);

            let orderData;
            try {
                orderData = JSON.parse(orderText);
            } catch (err) {
                console.error("❌ Failed to parse order JSON:", err);
                throw new Error("Invalid order response format");
            }

            if (!orderRes.ok) {
                console.warn("⚠️ Order creation failed:", orderData.error);
                throw new Error(orderData.error || "Order creation failed");
            }

            console.log("✅ Order created:", orderData._id);

            // Step 4: Redirect to GCash checkout
            Linking.openURL(checkout_url);

            // Step 5: Poll backend for payment status
            const pollInterval = setInterval(async () => {
                try {
                    const res = await fetch(
                        `https://api-motoxelerate.onrender.com/api/order/reference/${reference_id}`
                    );

                    const order = await res.json();

                    const status = order?.payment?.status;
                    console.log("🔄 Polling payment status:", status);

                    if (status?.toUpperCase() === "SUCCEEDED") {
                        clearInterval(pollInterval);
                        clearTimeout(timeout);
                        Alert.alert("✅ Payment successful!");
                        navigation.navigate("Tab", { screen: "Home" });
                    }
                } catch (err) {
                    console.warn("⚠️ Polling error:", err.message);
                }
            }, 3000);

            const timeout = setTimeout(() => {
                clearInterval(pollInterval);
                Alert.alert(
                    "⚠️ Payment timeout",
                    "We couldn't confirm your payment. Please try again."
                );
            }, 120000);
        } catch (error) {
            console.error("❌ Checkout Error:", error);
            Alert.alert("Error", error.message || "Checkout failed.");
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
                        nextIcon={require("../assets/Images/next.png")}
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
                        nextIcon={require("../assets/Images/next.png")}
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
