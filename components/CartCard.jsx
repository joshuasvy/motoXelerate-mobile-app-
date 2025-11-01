import {
    Animated,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Checkbox } from "react-native-paper";
import React, { useRef } from "react";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

export default function CartCard({
    product,
    onPress,
    onRemove,
    isSelected,
    onToggleSelect,
    onQuantityChange,
}) {
    const scaleMinus = useRef(new Animated.Value(1)).current;
    const scalePlus = useRef(new Animated.Value(1)).current;

    const animate = (ref) => {
        Animated.sequence([
            Animated.timing(ref, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(ref, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const rawPrice =
        product.price ||
        product.product_Price ||
        product.productId?.price ||
        "0";

    const priceValue = parseFloat(rawPrice.toString().replace(/[^\d.]/g, ""));

    return (
        <View style={styles.container}>
            <View style={styles.shadowWrapper}>
                <View style={styles.wrapper}>
                    {/* Product Image */}
                    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                        <Image
                            source={product.image}
                            style={styles.imageWrap}
                        />
                    </TouchableOpacity>

                    {/* Product Info */}
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            paddingHorizontal: 15,
                            paddingVertical: 8,
                        }}
                    >
                        <Text
                            style={[
                                Fonts.subtext,
                                { fontSize: 14, width: 165 },
                            ]}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {product.name}
                        </Text>

                        <Text style={[Fonts.semibold, { fontSize: 18 }]}>
                            ₱{priceValue.toLocaleString()}
                        </Text>

                        {/* Quantity Display Only */}
                        <View style={styles.quantityControls}>
                            <Animated.View
                                style={{ transform: [{ scale: scaleMinus }] }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.qtyBtn}
                                    onPress={() => {
                                        if (product.quantity > 1) {
                                            animate(scaleMinus);
                                            onQuantityChange(
                                                product.quantity - 1
                                            ); // ✅ decrement
                                        }
                                    }}
                                >
                                    <Text style={styles.qtyText}>−</Text>
                                </TouchableOpacity>
                            </Animated.View>

                            <Text style={[Fonts.regular, styles.qtyCount]}>
                                {product.quantity || 1}
                            </Text>

                            <Animated.View
                                style={{ transform: [{ scale: scalePlus }] }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.qtyBtn}
                                    onPress={() => {
                                        if (product.quantity < product.stock) {
                                            console.log(
                                                "🧪 CartCard product:",
                                                product
                                            );
                                            onQuantityChange(
                                                product.quantity + 1
                                            );
                                        } else {
                                            Alert.alert(
                                                "Stock Limit Reached",
                                                `Maximum quantity for ${
                                                    product.name ||
                                                    "this product"
                                                } is ${product.stock}.`
                                            );
                                        }
                                    }}
                                    disabled={product.quantity >= product.stock}
                                >
                                    <Text style={styles.qtyText}>+</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>

                    {/* Checkbox and Remove Button */}
                    <View style={{ position: "absolute", top: 0, right: 0 }}>
                        <Checkbox
                            status={isSelected ? "checked" : "unchecked"}
                            onPress={() => onToggleSelect(product)}
                            color={Colors.primary}
                            uncheckedColor="#000"
                        />
                    </View>
                    <TouchableOpacity
                        style={{ position: "absolute", bottom: 8, right: 9 }}
                        onPress={onRemove}
                    >
                        <Image
                            source={require("../assets/Images/icons/delete.png")}
                            alt="Delete icon"
                            style={styles.deleteIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    shadowWrapper: {
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    wrapper: {
        flexDirection: "row",
        borderRadius: 8,
        width: 355,
        height: 135,
        position: "relative",
    },
    imageWrap: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    qtyText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    qtyCount: {
        fontSize: 15,
        minWidth: 23,
        textAlign: "center",
    },
    deleteIcon: {
        width: 23,
        height: 23,
        resizeMode: "contain",
    },
});
