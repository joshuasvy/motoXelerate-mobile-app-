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
        position: "relative",
    },
    profile: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
    },
    uploadIcon: {
        width: 50,
        height: 50,
        position: "absolute",
        bottom: -10,
        right: 15,
        borderRadius: 20,
        padding: 6,
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
        marginRight: 51,
        fontSize: 18,
    },
    nextIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        marginBottom: 5,
    },
    logoutWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        marginBottom: 40,
    },
    logoutBtn: {
        backgroundColor: Colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 45,
        borderRadius: 13,
    },
});

export default styles;
