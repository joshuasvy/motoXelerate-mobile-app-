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
import { useState, useContext } from "react";
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
                ? parseFloat(rawPrice.replace(/[^\d.]/g, "") || "0")
                : Number(rawPrice);
        return sum + price * (item.quantity || 1);
    }, 0);

    const handleOrderCheckout = async () => {
        try {
            const selectedItems = selectedProducts.map((item) => {
                if (!item.productId && !item._id) {
                    console.warn("⚠️ Missing product reference in item:", item);
                }
                return {
                    product: item.productId || item._id,
                    quantity: item.quantity || 1,
                };
            });

            const payload = {
                userId,
                selectedItems,
                totalOrder,
                paymentMethod,
                notes,
            };

            console.log("📦 Checkout payload:", payload);

            const response = await fetch(
                "https://api-motoxelerate.onrender.com/api/order",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    "Order Placed",
                    "Your order has been successfully submitted."
                );
                navigation.navigate("Tab", { screen: "Home" });
            } else {
                throw new Error(data.error || "Order failed");
            }
        } catch (error) {
            console.error("❌ Order Checkout Error:", error);
            Alert.alert("Error", error.message || "Failed to place order.");
        }
    };

    const handleGcashCheckout = async () => {
        try {
            const response = await fetch(
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

            const data = await response.json();
            const redirectUrl = data.actions?.mobile_web_checkout_url;

            if (redirectUrl) {
                Linking.openURL(redirectUrl);
            } else {
                Alert.alert("Error", "No redirect URL received.");
            }
        } catch (error) {
            console.error("❌ GCash Checkout Error:", error);
            Alert.alert("Error", "Failed to initiate GCash payment.");
        }
    };

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
                        onPress={handleGcashCheckout}
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
                            const price = parseFloat(
                                item.price?.replace(/[^\d.]/g, "") || "0"
                            );
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
                        onBuy={handleOrderCheckout}
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
