import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },
  backWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    marginVertical: 10,
  },
  imageIcon: {
    width: 35,
    height: 35,
  },
  addressWrapper: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 18,
    padding: 15,
  },
  methodpaymentWrapper: {
    marginTop: 5,
  },
  infopaymentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginTop: 10,
  },
  gcashlogo: {
    width: 25,
    height: 25,
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
