import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bannerWrapper: {
    marginTop: 10,
  },
  productImage: {
    width: "100%",
    height: 175,
    resizeMode: "cover",
    borderRadius: 10,
  },
  infoWrapper: {
    marginTop: 15,
  },
  infopaymentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginTop: 10,
  },
  gcashlogo: {
    width: 27,
    height: 25,
  },
  reviewBtn: {
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: Colors.primary,
    width: 185,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    alignSelf: "center",
    position: "relative",
    marginTop: 55,
  },
  reviewIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 12,
  }
});

export default styles;
