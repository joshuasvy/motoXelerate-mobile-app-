import { StyleSheet, Text, View, Image } from "react-native";
import Fonts from "../constants/Fonts";
import React from "react";

export default function NormalCard({ display, name, specification }) {
    return (
        <View style={styles.notifWrapper}>
            <Image source={display} style={styles.productImage} />
            <View style={styles.infoWrapper}>
                <Text style={[Fonts.semibold, { fontSize: 16, marginTop: 10 }]}>
                    {name}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: "80%",
                    }}
                >
                    <Text
                        style={[
                            Fonts.regular,
                            { fontSize: 12, marginTop: 8, flexShrink: 1 },
                        ]}
                    >
                        {specification}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    notifWrapper: {
        flexDirection: "row",

        width: "100%",
        alignSelf: "center",
    },
    productImage: {
        width: 140,
        height: 150,
        resizeMode: "cover",
        borderRadius: 10,
    },
    infoWrapper: {
        marginLeft: 8,
    },
});
