import { StyleSheet } from "react-native";
import Fonts from "../constants/Fonts";
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
        resizeMode: "contain",
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
    backIcon: {
        width: 38,
        height: 38,
    },
    notifIcon: {
        width: 26,
        height: 26,
    },
    nameWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    productName: {
        width: 300,
        fontFamily: Fonts.title.fontFamily,
        fontSize: 21,
    },
    stocks: {
        fontFamily: Fonts.minitext.fontFamily,
        fontSize: 12,
        color: "#797979",
    },
    rateWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        marginBottom: 10,
    },
    starIcon: {
        width: 15,
        height: 15,
        marginRight: 6,
    },
    rate: {
        fontFamily: Fonts.minitext.fontFamily,
        fontSize: 11,
        color: "#797979",
    },
    price: {
        fontFamily: Fonts.semibold.fontFamily,
        fontSize: 22,
    },
    specsWrapper: {
        fontFamily: Fonts.subtext.fontFamily,
        fontSize: 17,
        marginTop: 15,
    },
    specification: {
        fontFamily: Fonts.regular.fontFamily,
        marginVertical: 12,
    },
    viewReviews: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 13,
        marginBottom: 8,
    },
    review: {
        fontFamily: Fonts.subtext.fontFamily,
        fontSize: 17,
    },
    viewAll: {
        fontFamily: Fonts.minitext.fontFamily,
        fontSize: 14,
    },
    viewbtnWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    nextIcon: {
        width: 22,
        height: 22,
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 18,
        marginBottom: 10,
    },
});

export default styles;
