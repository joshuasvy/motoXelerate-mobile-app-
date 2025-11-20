import { StyleSheet } from "react-native";
import colors from "../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    wrapper: {
        justifyContent: "center",
        paddingHorizontal: 35,
        marginTop: 10,
    },
    buttonWrapper: {
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    checkbox: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    footerWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 85,
    },
});

export default styles;
