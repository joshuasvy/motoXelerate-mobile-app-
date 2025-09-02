import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  buttonWrapper: {
    backgroundColor: Colors.primary,
    height: 105,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
  },
  priceContainer: {
    marginLeft: 50,
  },
  totalPrice: {
    color: "#fff",
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

export default styles;
