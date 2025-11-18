import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Fonts from "../constants/Fonts";
import React from "react";

export default function RecommendedProdCard({ product }) {
    // Normalizes any image value into a valid RN Image source
    const getImageSource = (img) => {
        // require(...) returns a number
        if (typeof img === "number") return img;

        // Already an object (e.g., { uri: "..." })
        if (img && typeof img === "object" && img.uri) return img;

        // A plain string URL
        if (typeof img === "string" && img.length > 0) return { uri: img };

        // Fallback
        return require("../assets/Images/product/fallbackImage.png");
    };

    return (
        <View style={styles.wrapper}>
            <Image
                source={getImageSource(product?.image)}
                style={{
                    width: "100%",
                    height: "50%",
                    resizeMode: "contain",
                    alignSelf: "center",
                    justifyContent: "center",
                }}
            />

            <View style={{ padding: 8, marginTop: 5 }}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[
                        Fonts.regular,
                        {
                            fontSize: 15,
                            lineHeight: 18,
                            marginBottom: 5,
                        },
                    ]}
                >
                    {product.name}
                </Text>
                <View style={{ position: "absolute", top: 50, left: 10 }}>
                    <Text style={[Fonts.semibold, { fontSize: 17 }]}>
                        ₱{" "}
                        {typeof product.price === "string"
                            ? parseFloat(
                                  product.price.replace(/[^\d.]/g, "") || "0"
                              ).toLocaleString()
                            : product.price.toLocaleString()}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 8,
                        }}
                    >
                        <Image
                            source={require("../assets/Images/icons/starFill.png")}
                            style={{ width: 14, height: 14 }}
                        />
                        <Text
                            style={[
                                Fonts.minitext,
                                {
                                    fontSize: 10,
                                    color: "#797979",
                                    marginLeft: 5,
                                    marginTop: 2,
                                },
                            ]}
                        >
                            {product.rate}{" "}
                            <Text>({product.review} reviews)</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: 180,
        height: 240,
        borderRadius: 8,
        backgroundColor: "#fff",
        overflow: "hidden",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        position: "relative",
    },
});
