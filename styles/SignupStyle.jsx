import { StyleSheet } from "react-native";
import colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    justifyContent: "center",
    paddingHorizontal: 35,
  },
  buttonWrapper: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
