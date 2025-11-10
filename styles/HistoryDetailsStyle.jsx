import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    bannerWrapper: {
        marginTop: 10,
    },
    productImage: {
        width: 300,
        height: 300,
        resizeMode: "contain",
        borderRadius: 10,
    },
    infoWrapper: {
        marginTop: 15,
    },
    infopaymentWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
        marginTop: 10,
    },
    gcashlogo: {
        width: 27,
        height: 25,
    },
    reviewBtn: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Colors.test,
        backgroundColor: Colors.primary,
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 13,
        gap: 18,
        paddingVertical: 11,
        paddingHorizontal: 14,
        marginTop: 50,
        marginBottom: 23,
    },
    reviewIcon: {
        width: 25,
        height: 25,
    },
});

export default styles;
