import { StyleSheet } from "react-native";
import colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  logo: {
    height: 85,
    width: 85,
    borderWidth: 1,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    fontSize: 14,
    textAlign: "left",
    paddingLeft: 38,
    width: 195,
    padding: 8,
  },
  searchIcon: {
    position: "absolute",
    width: 20,
    height: 20,
    left: 120,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
});

export default styles;
