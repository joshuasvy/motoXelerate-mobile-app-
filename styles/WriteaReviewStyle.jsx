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
        gap: 6,
    },
    starIcon: {
        width: 21,
        height: 21,
        resizeMode: "contain",
        marginBottom: 5,
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: "#bbbbbbff",
        fontFamily: Fonts.regular.fontFamily,
        paddingBottom: 5,
    },
    postBtn: {
        borderWidth: 1,
        borderColor: Colors.test,
        backgroundColor: Colors.primary,
        borderRadius: 12,
        marginTop: 20,
        paddingVertical: 4,
        paddingHorizontal: 20,
        alignSelf: "flex-end",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 6.0,
        elevation: 4,
    },
});

export default styles;
