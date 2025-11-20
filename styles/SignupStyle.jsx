import { StyleSheet } from "react-native";
import colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        position: "relative",
    },
    wrapper: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 35,
    },
    errorPlaceholder: {
        fontFamily: Fonts.regular.fontFamily,
        fontSize: 12,
        color: "#ff0d08ff",
        marginTop: 11,
    },
    buttonWrapper: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;
