import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 15,
    },
    cardContainer: {
        paddingVertical: 15,
    },
    markAsRead: {
        alignSelf: "flex-end",
        marginBottom: 8,
    },
    notifWrapper: {
        flexDirection: "row",
        width: "100%",
        alignSelf: "center",
        // backgroundColor: "#faeed5ff",
        borderRadius: 5,
        padding: 10,
        marginBottom: 9,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#a3a2a2ff",
    },
    productImage: {
        width: 110,
        height: 110,
        resizeMode: "contain",
        borderRadius: 5,
    },
    infoWrapper: {
        width: 230,
        marginLeft: 8,
    },
});

export default styles;
