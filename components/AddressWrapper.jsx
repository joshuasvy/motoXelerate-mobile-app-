import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import React from "react";

export default function AddressWrapper({ nextIcon, address }) {
    return (
        <View style={styles.addressWrapper}>
            <Text style={[Fonts.semibold, { fontSize: 19, marginTop: 5 }]}>
                Address
            </Text>
            <Text style={[Fonts.regular, { fontSize: 13 }]}>
                {address || "No address provided"}
            </Text>
            {nextIcon && <Image source={nextIcon} style={styles.nextBtn} />}
        </View>
    );
}

const styles = StyleSheet.create({
    addressWrapper: {
        backgroundColor: Colors.primary,
        height: 110,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 8,
        position: "relative",
    },
    nextBtn: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        position: "absolute",
        right: 10,
        bottom: 10,
    },
});
