import {
  View,
  Text,
  StatusBar,
  ScrollView,
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
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

export default function Checkout({ navigation }) {
  const route = useRoute();
  const selectedProducts = route.params?.selectedProducts ?? [];
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const totalPrice = selectedProducts.reduce((sum, item) => {
    const price = parseFloat(item.price?.replace(/[^\d.]/g, "") || "0");
    return sum + price * (item.quantity || 1);
  }, 0);

  const handleGcashCheckout = async () => {
    try {
      const response = await fetch(
        "https://api-motoxelerate.onrender.com/api/gcash",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalPrice,
            userId: userId, // ✅ pulled from context
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
      console.error("GCash Checkout Error:", error);
      Alert.alert("Error", "Failed to initiate GCash payment.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <SimpleHeader goBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View style={{ marginBottom: 10 }}>
          <AddressWrapper nextIcon={require("../assets/Images/next.png")} />
        </View>

        {selectedProducts.map((product) => (
          <View key={product._id} style={{ marginVertical: 10 }}>
            <ProductCheckoutCard product={product} />
          </View>
        ))}

        <BreakLine />

        <Text style={[Fonts.subtext, { fontSize: 17 }]}>Specification</Text>
        <Text style={[Fonts.regular, { marginTop: 18 }]}>
          {selectedProducts[0]?.specification ||
            "No specification available for this product."}
        </Text>

        <BreakLine />
        <View style={{ marginBottom: 45 }}>
          <PaymentMethod
            nextIcon={require("../assets/Images/next.png")}
            onPress={handleGcashCheckout}
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
            <Text style={[Fonts.subtext, styles.subtotal]}>Sub Total</Text>
            {selectedProducts.map((item) => {
              const price = parseFloat(
                item.price?.replace(/[^\d.]/g, "") || "0"
              );
              const subtotal = price * (item.quantity || 1);
              return (
                <Text
                  key={item._id}
                  style={[Fonts.semibold, styles.productPrice]}
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
            total={totalPrice}
            selectedProducts={selectedProducts}
            onBuy={handleGcashCheckout}
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
