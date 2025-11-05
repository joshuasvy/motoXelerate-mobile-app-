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
        width: 220,
        padding: 5,
        paddingLeft: 32,
    },
    searchIcon: {
        position: "absolute",
        width: 18,
        height: 18,
        left: 9,
        bottom: 8,
        resizeMode: "contain",
    },
    headerIcons: {
        flexDirection: "row",
        gap: 10,
    },
});

export default styles;
