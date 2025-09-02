import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
  },
  cardContainer: {
    paddingVertical: 15,
  },
  notifWrapper: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
  },
  productImage: {
    width: 140,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  infoWrapper: {
    marginLeft: 8,
  },
});

export default styles;
