import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  profile: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
  },
  formWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  input: {
    marginRight: 41,
    fontSize: 18,
  },
  nextIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginBottom: 5,
  },
});

export default styles;
