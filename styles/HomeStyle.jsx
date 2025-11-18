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
        paddingHorizontal: 13,
    },
    logo: {
        height: 100,
        width: 90,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#727171ff",
        borderRadius: 18,
        backgroundColor: "#fff",
        alignItems: "center",
        fontSize: 14,
        textAlign: "left",
        width: 220,
        padding: 6,
        paddingLeft: 34,
    },
    searchIcon: {
        position: "absolute",
        width: 18,
        height: 18,
        left: 10,
        bottom: 10,
        resizeMode: "contain",
    },
    headerIcons: {
        flexDirection: "row",
        gap: 10,
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "red",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        minWidth: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 11,
        fontWeight: "bold",
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    categoryWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginVertical: 10,
        zIndex: 1000,
        elevation: 1000,
    },
    categoryDropdown: {
        flex: 1,
        marginRight: 5,
        zIndex: 2000,
        elevation: 2000,
    },
    priceDropdown: {
        flex: 1,
        marginLeft: 5,
        zIndex: 1000,
        elevation: 1000,
    },
});

export default styles;
