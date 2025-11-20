import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Fonts from "../constants/Fonts";

const Button = ({
    title,
    width,
    height,
    backgroundColor,
    onPress,
    disabled = false, // 👈 new prop
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { width, height, backgroundColor },
                disabled && { opacity: 0.5 }, // 👈 visual cue
            ]}
            onPress={disabled ? undefined : onPress} // 👈 block presses when disabled
            activeOpacity={disabled ? 1 : 0.8} // 👈 no press feedback when disabled
            disabled={disabled} // 👈 native disabled prop
        >
            <Text style={[Fonts.subtext, { color: "#fff" }]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 6.0,
        elevation: 4,
    },
});
