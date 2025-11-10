import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import React from "react";

export default function OrderStatusCard({ userId, onPress, statusFilter }) {
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // ✅ Move fetchOrders to top-level scope
    const fetchOrders = async () => {
        try {
            if (!userId) {
                console.warn("⚠️ Missing userId. Skipping fetch.");
                return;
            }

            console.log("🔍 Fetching orders for userId:", userId);
            const response = await axios.get(
                `https://api-motoxelerate.onrender.com/api/order/user/${userId}`
            );

            const rawOrders = response.data;
            console.log("📦 Raw orders fetched:", rawOrders);

            if (!Array.isArray(rawOrders)) {
                console.warn("⚠️ Unexpected orders format:", rawOrders);
                setOrders([]);
                return;
            }

            const validOrders = rawOrders.filter((order, index) => {
                const isValid =
                    order.orderId &&
                    Array.isArray(order.items) &&
                    order.items.length > 0;

                if (!isValid) {
                    console.warn(`⚠️ Invalid order at index ${index}:`, order);
                }

                return isValid;
            });

            console.log(`✅ Loaded ${validOrders.length} valid orders.`);
            setOrders(validOrders);
        } catch (err) {
            console.error("❌ Failed to fetch orders:", err.message);
            setOrders([]);
        }
    };

    // ✅ useEffect calls fetchOrders on mount or when userId/statusFilter changes
    useEffect(() => {
        fetchOrders();
    }, [userId, statusFilter]);

    // ✅ Pull-to-refresh handler
    const onRefresh = async () => {
        console.log("🔄 Refresh triggered");
        setRefreshing(true);
        try {
            await fetchOrders();
        } catch (err) {
            console.error("❌ Error refreshing:", err.message);
        } finally {
            setRefreshing(false);
        }
    };

    const normalizedFilter = statusFilter?.toLowerCase().trim();

    const filteredItems = orders.flatMap((order, orderIndex) =>
        order.items
            .filter((item, itemIndex) => {
                const itemStatus = item.status?.toLowerCase().trim();
                const match = itemStatus === normalizedFilter;

                if (!match) {
                    console.log(
                        `⛔ Skipping item [${order.orderId}] index ${itemIndex} with status "${item.status}" (filter: "${statusFilter}")`
                    );
                } else {
                    console.log(
                        `✅ Matched item [${order.orderId}] index ${itemIndex} with status "${item.status}"`
                    );
                }

                return match;
            })
            .map((item) => ({ ...item, orderId: order.orderId }))
    );

    console.log(
        `🧾 OrderStatusCard: ${filteredItems.length} items match status "${statusFilter}"`
    );

    return (
        <ScrollView
            style={{ height: 400, marginTop: 15, overflow: "scroll" }} // adjust based on your screen size
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {filteredItems.map((item, index) => {
                const {
                    productName,
                    specification,
                    price,
                    image,
                    status,
                    productId,
                    orderId,
                } = item;

                if (!productName || price === undefined || !status) {
                    console.warn(
                        `⚠️ Incomplete item data in order ${orderId} at index ${index}:`,
                        item
                    );
                    return null;
                }

                const safePrice =
                    typeof price === "string"
                        ? parseFloat(price.replace(/[^\d.]/g, "") || "0")
                        : Number(price);

                const imageUri =
                    typeof image === "string" &&
                    image.startsWith("http") &&
                    image.trim() !== ""
                        ? image
                        : "https://res.cloudinary.com/dhh37ekzf/image/upload/v1761966774/Starter_pfp_ymrios.jpg";

                return (
                    <View
                        key={`${orderId}-${productId}-${index}`}
                        style={styles.container}
                    >
                        <View style={styles.shadowWrapper}>
                            <View style={styles.wrapper}>
                                <Image
                                    source={{ uri: imageUri }}
                                    style={styles.imageWrap}
                                />

                                <View style={styles.infoWrapper}>
                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                        style={[
                                            Fonts.subtext,
                                            { fontSize: 14, width: 210 },
                                        ]}
                                    >
                                        {productName}
                                    </Text>
                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                        style={[
                                            Fonts.regular,
                                            styles.specification,
                                        ]}
                                    >
                                        {specification || "No specification"}
                                    </Text>

                                    <View style={styles.priceStatusWrapper}>
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
                                            ₱ {safePrice.toLocaleString()}
                                        </Text>
                                        <View style={styles.statusWrapper}>
                                            <Text
                                                style={[
                                                    Fonts.regular,
                                                    { fontSize: 12 },
                                                ]}
                                            >
                                                {status}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => onPress(item)}
                                >
                                    <Image
                                        source={require("../assets/Images/icons/next.png")}
                                        style={styles.nextIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: 10,
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
        resizeMode: "contain",
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
