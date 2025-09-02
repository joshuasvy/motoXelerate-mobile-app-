import { StyleSheet } from "react-native";
import colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageWrapper: {
    height: 330,
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingRight: 15,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  backBtn: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  cardWrapper: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  imageWrap: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    marginBottom: 10,
    // borderWidth: 1,
  },
});

export default styles;
