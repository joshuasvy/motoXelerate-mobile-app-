import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  reviewWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 8,
    gap: 15,
  },
  starBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  starIcon: {
    width: 20,
    height: 22,
    resizeMode: "contain",
    marginBottom: 5,
  },
  textInput: {
    borderBottomWidth: 1,
    fontFamily: Fonts.regular.fontFamily,
    paddingBottom: 15,
  },
  postBtn: {
    width: 85,
    height: 40,
    borderWidth: 1,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    marginTop: 20,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6.0,
    elevation: 4,
  },
});

export default styles;
