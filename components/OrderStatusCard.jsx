import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import React from "react";

export default function OrderStatusCard({ userId, onPress, statusFilter }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `https://api-motoxelerate.onrender.com/api/order/user/${userId}`
                );
                setOrders(response.data);
            } catch (err) {
                console.error("❌ Failed to fetch user orders:", err);
            }
        };

        if (userId) fetchOrders();
    }, [userId]);

    return (
        <>
            {orders.map((order) =>
                order.items
                    .filter(
                        (item) =>
                            !statusFilter ||
                            (Array.isArray(statusFilter)
                                ? statusFilter.includes(item.status)
                                : item.status === statusFilter)
                    )
                    .map((item, index) => {
                        const rawPrice = item.price ?? 0;
                        const price =
                            typeof rawPrice === "string"
                                ? parseFloat(
                                      rawPrice.replace(/[^\d.]/g, "") || "0"
                                  )
                                : Number(rawPrice);

                        return (
                            <View
                                key={`${order._id}-${index}`}
                                style={styles.container}
                            >
                                <View style={styles.shadowWrapper}>
                                    <View style={styles.wrapper}>
                                        <Image
                                            source={{
                                                uri: item.image?.startsWith(
                                                    "http"
                                                )
                                                    ? item.image
                                                    : "https://via.placeholder.com/100",
                                            }}
                                            style={styles.imageWrap}
                                        />

                                        <View style={styles.infoWrapper}>
                                            <Text
                                                numberOfLines={2}
                                                ellipsizeMode="tail"
                                                style={[
                                                    Fonts.subtext,
                                                    {
                                                        fontSize: 14,
                                                        width: 210,
                                                    },
                                                ]}
                                            >
                                                {item.productName ||
                                                    "Unnamed Product"}
                                            </Text>
                                            <Text
                                                numberOfLines={2}
                                                ellipsizeMode="tail"
                                                style={[
                                                    Fonts.regular,
                                                    styles.specification,
                                                ]}
                                            >
                                                {item.specification ||
                                                    "No specification available for this Product."}
                                            </Text>

                                            <View
                                                style={
                                                    styles.priceStatusWrapper
                                                }
                                            >
                                                <Text
                                                    style={[
                                                        Fonts.subtext,
                                                        {
                                                            fontSize: 17,
                                                            marginTop: 5,
                                                            width: 85,
                                                        },
                                                    ]}
                                                >
                                                    ₱ {price.toLocaleString()}
                                                </Text>
                                                <View
                                                    style={styles.statusWrapper}
                                                >
                                                    <Text
                                                        style={[
                                                            Fonts.regular,
                                                            { fontSize: 12 },
                                                        ]}
                                                    >
                                                        {item.status}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() =>
                                                onPress(order.items[index])
                                            }
                                        >
                                            <Image
                                                source={require("../assets/Images/next.png")}
                                                style={styles.nextIcon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })
            )}
        </>
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
        width: 360,
        height: 126,
        position: "relative",
    },
    imageWrap: {
        width: 130,
        height: "100%",
        resizeMode: "cover",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    infoWrapper: {
        marginLeft: 8,
        paddingVertical: 3,
    },
    specification: {
        fontSize: 11,
        marginTop: 3,
        paddingLeft: 8,
        width: 220,
        position: "absolute",
        top: 43,
    },
    priceStatusWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        position: "absolute",
        bottom: 6,
    },
    statusWrapper: {
        paddingHorizontal: 9,
        paddingVertical: 4,
        backgroundColor: Colors.primary,
        borderRadius: 13,
    },
    nextIcon: {
        width: 26,
        height: 26,
        position: "absolute",
        bottom: 6,
        left: -28,
    },
});
