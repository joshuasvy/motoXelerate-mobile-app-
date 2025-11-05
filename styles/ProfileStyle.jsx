import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

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
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#ffffff",
        width: 135,
        height: 135,
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
        marginTop: 10,
        width: "60%",
        backgroundColor: Colors.primary,
        borderRadius: 10,
        paddingVertical: 4,
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
    statusTabs: {
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        gap: 12,
        marginTop: 6,
        paddingHorizontal: 13,
    },
    statusButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
    },
    activeStatusButton: {
        backgroundColor: Colors.primary,
    },

    activeStatusText: {
        fontFamily: Fonts.subtext.fontFamily,
        color: "#fff",
    },

    iconTextWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    statusIcon: {
        width: 23,
        height: 23,
        resizeMode: "contain",
    },
});

export default styles;
