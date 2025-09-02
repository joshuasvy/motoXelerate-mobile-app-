import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    borderWidth: 1,
  },
  historyBtnWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginRight: 20,
  },
  historyImage: {
    width: 18,
    height: 18,
  },
  cardWrapper: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default styles;
