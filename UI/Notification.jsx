import React, { useEffect, useState, useCallback, useContext } from "react";
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/NotificationStyle";
import Header from "../components/DefaultHeader";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { AuthContext } from "../context/authContext";
import { NotificationContext } from "../context/notificationContext";

const Notification = ({ navigation }) => {
    const { markAllAsRead, fetchUnreadCount } = useContext(NotificationContext);
    const { user } = useContext(AuthContext); // ✅ get user from context
    const userId = user?._id;

    const [orderUpdates, setOrderUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrderUpdates = async (source = "initial") => {
        console.log(
            `[INFO] Fetching order updates (${source}) for userId: ${userId}`
        );

        if (!userId) {
            console.warn("[WARN] Missing userId from AuthContext");
            return;
        }

        try {
            const res = await fetch(
                `https://api-motoxelerate.onrender.com/api/user/${userId}/order-updates`
            );
            if (!res.ok) {
                console.error(
                    `[ERROR] Server responded with status ${res.status}`
                );
                return;
            }

            const data = await res.json();

            if (!Array.isArray(data)) {
                console.error("[ERROR] Unexpected response format:", data);
                return;
            }

            setOrderUpdates(data);
            console.log(`[INFO] Received ${data.length} order updates`);
        } catch (err) {
            console.error("[ERROR] Failed to fetch order updates:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchOrderUpdates("initial");
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchOrderUpdates("pull-to-refresh");
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />

            <Header
                backIcon={require("../assets/Images/icons/back.png")}
                goBack={() => navigation.goBack()}
                back={"Back"}
                title={"Notification"}
            />

            <ScrollView
                style={styles.cardContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.markAsRead}
                    onPress={async () => {
                        console.log("🧹 Marking all as read...");
                        await markAllAsRead();
                        await fetchUnreadCount();
                    }}
                >
                    <Text style={[Fonts.regular, { fontSize: 13 }]}>
                        Mark as read
                    </Text>
                </TouchableOpacity>
                {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : orderUpdates.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        No notifications yet.
                    </Text>
                ) : (
                    orderUpdates.map((item) => (
                        <View key={item._id} style={styles.notifWrapper}>
                            <Image
                                source={{ uri: item.items[0].product.image }}
                                style={styles.productImage}
                            />
                            <View style={styles.infoWrapper}>
                                <Text style={[Fonts.regular, { fontSize: 16 }]}>
                                    Order {item.items[0].status}
                                </Text>
                                <Text
                                    style={[
                                        Fonts.regular,
                                        { fontSize: 13, flexShrink: 1 },
                                    ]}
                                >
                                    Order{" "}
                                    <Text style={{ color: Colors.primary }}>
                                        {item._id}{" "}
                                    </Text>
                                    <Text>has been </Text>
                                    {item.items[0].status}{" "}
                                    <Text>
                                        Item {item.items[0].product._id}
                                    </Text>
                                </Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        width: "80%",
                                    }}
                                ></View>
                                <Text
                                    style={[
                                        Fonts.regular,
                                        {
                                            fontSize: 10,
                                            marginTop: 6,
                                            color: "#888",
                                        },
                                    ]}
                                >
                                    {new Date(item.updatedAt).toLocaleString()}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Notification;
