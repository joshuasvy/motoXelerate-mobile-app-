import { StyleSheet, Text, View } from "react-native";
import ProductBtn from "./ProductBtn";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

export default function CheckoutButton() {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonWrapper}>
        <View style={styles.priceContainer}>
          <Text style={[Fonts.title, styles.totalPrice]}>Total Price</Text>
          <Text style={[Fonts.semibold, styles.price]}>₱99.99</Text>
        </View>
        <View style={styles.breakLine} />
        <ProductBtn
          name={"Buy"}
          backgroundColor={Colors.primary}
          onPress={() => console.log("Buy Clicked")}
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
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    marginLeft: 50,
  },
  totalPrice: {
    color: Colors.test,
    fontSize: 14,
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
