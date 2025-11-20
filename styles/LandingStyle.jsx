import { StyleSheet } from "react-native";
import colors from "../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentWrapper: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 110,
    },
    checkbox: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 23,
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 35,
    },
});

export default styles;
