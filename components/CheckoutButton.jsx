import { StyleSheet, Text, View } from "react-native";
import ProductBtn from "./ProductBtn";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

export default function CheckoutButton({ total, onBuy }) {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonWrapper}>
        <View style={styles.priceContainer}>
          <Text style={[Fonts.title, styles.totalPrice]}>Total Price</Text>
          <Text style={[Fonts.semibold, styles.price]}>
            ₱{total.toLocaleString()}
          </Text>
        </View>
        <View style={styles.breakLine} />
        <ProductBtn
          name={"Buy"}
          backgroundColor={Colors.primary}
          onPress={onBuy} // ✅ triggers GCash checkout
          width={155}
          fontSize={17}
          color={"#000000"}
          btnIcon={require("../assets/Images/bag.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  priceContainer: {
    marginLeft: 50,
  },
  totalPrice: {
    fontSize: 16,
    color: Colors.test,
  },
  price: {
    fontSize: 22,
  },
  breakLine: {
    backgroundColor: "#fff",
    width: 1,
    height: 70,
    marginLeft: 67,
  },
});
