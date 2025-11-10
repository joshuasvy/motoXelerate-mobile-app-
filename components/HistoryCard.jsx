import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import React from "react";

export default function HistoryCard({ onPress }) {
    return (
        <View style={styles.shadowWrapper}>
            <View style={styles.cardWrapper}>
                <Image
                    source={require("../assets/Images/testingImage.jpg")}
                    style={styles.prodImage}
                />
                <View style={{ gap: 60 }}>
                    <View style={styles.nameNext}>
                        <Text style={[Fonts.subtext, { fontSize: 17 }]}>
                            Product Name
                        </Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                            <Image
                                source={require("../assets/Images/icons/next.png")}
                                style={styles.nextIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.priceStatus}>
                        <Text
                            style={[
                                Fonts.semibold,
                                { fontSize: 17, marginTop: 4 },
                            ]}
                        >
                            $ 99.99
                        </Text>
                        <View style={styles.statusWrapper}>
                            <Text
                                style={[
                                    Fonts.regular,
                                    {
                                        fontSize: 13,
                                        textAlign: "center",
                                        marginTop: 3,
                                        padding: 2,
                                    },
                                ]}
                            >
                                Order Status
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowWrapper: {
        width: "93%",
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    cardWrapper: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 3,
        overflow: "hidden",
    },
    prodImage: {
        width: 140,
        height: 150,
        resizeMode: "cover",
        borderRadius: 10,
        margin: 3,
    },
    nameNext: {
        flexDirection: "row",
        gap: 48,
        margin: 8,
    },
    priceStatus: {
        flexDirection: "row",
        gap: 45,
        margin: 8,
    },
    nextIcon: {
        width: 28,
        height: 28,
    },
    statusWrapper: {
        backgroundColor: Colors.primary,
        padding: 3,
        borderRadius: 8,
    },
});
