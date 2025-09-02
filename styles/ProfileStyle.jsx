import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    marginHorizontal: 15,
    marginBottom: 5,
  },
  profilePic: {
    borderRadius: 50,
    width: 120,
    height: 120,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 8,
  },
  username: {
    fontSize: 21,
    marginTop: 20,
  },
  buttonContainer: {
    width: 195,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 13,
    marginTop: 18,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
  },
  historyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  historyIcon: {
    width: 18,
    height: 18,
    resizeMode: "cover",
  },
});

export default styles;
