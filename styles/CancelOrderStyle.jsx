import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  buttonWrapper: {
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

export default styles;
