import { StyleSheet, Text, View, Image } from "react-native";
import Fonts from "../constants/Fonts";
import React from "react";

export default function NormalCard({ display, name, specification }) {
    return (
        <View style={styles.notifWrapper}>
            <Image source={display} style={styles.productImage} />
            <View style={styles.infoWrapper}>
                <Text
                    numberOfLines={2}
                    style={[
                        Fonts.semibold,
                        {
                            width: 220,
                            fontSize: 16,
                            marginTop: 10,
                            truncate: "tail",
                        },
                    ]}
                >
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
        resizeMode: "contain",
        borderRadius: 10,
    },
    infoWrapper: {
        marginLeft: 8,
    },
});
