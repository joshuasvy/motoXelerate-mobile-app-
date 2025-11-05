import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import styles from "../styles/ProfileStyle";
import DefaultHeader from "../components/DefaultHeader";
import Fonts from "../constants/Fonts";
import BreakLine from "../components/BreakLine";
import OrderStatusCard from "../components/OrderStatusCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("Completed");
    const [refreshing, setRefreshing] = useState(false);

    const statusOptions = [
        "For Approval",
        "To ship",
        "Shipped",
        "Delivered",
        "Completed",
    ];

    const statusMap = {
        "For Approval": "for approval",
        "To ship": "to ship",
        Shipped: "shipped",
        Delivered: "delivered",
        Completed: "completed",
    };

    const defaultProfile =
        "https://res.cloudinary.com/dhh37ekzf/image/upload/v1761966774/Starter_pfp_ymrios.jpg";

    const fetchUserInfo = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                console.warn("⚠️ No token found in storage.");
                return;
            }

            const response = await fetch(
                "https://api-motoxelerate.onrender.com/api/user/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await response.json();
            if (response.ok) {
                setUserData(data);
                console.log("👤 User data fetched:", data);
            } else {
                console.error(
                    "❌ Failed to fetch user:",
                    data.message || data.error
                );
            }
        } catch (err) {
            console.error("❌ Error fetching user info:", err.message);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    if (userData?.id) {
        console.log("🧾 Profile: userId =", userData.id);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <DefaultHeader
                title={"Profile"}
                onPress={() => navigation.navigate("Notification")}
            />

            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: userData?.image || defaultProfile }}
                    style={styles.profilePic}
                />

                <View style={styles.infoContainer}>
                    <Text style={[Fonts.semibold, styles.username]}>
                        {userData
                            ? `${userData.firstName} ${userData.lastName}`
                            : "Loading..."}
                    </Text>
                    <Text style={[Fonts.regular, { fontSize: 14 }]}>
                        {userData?.email || "Loading..."}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.buttonContainer}
                        onPress={() => navigation.navigate("EditProfile")}
                    >
                        <Text
                            style={[
                                Fonts.title,
                                {
                                    color: "#ffff",
                                    fontSize: 16,
                                    textAlign: "center",
                                },
                            ]}
                        >
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    alignSelf: "center",
                    width: "92%",
                    height: 1,
                    marginVertical: 18,
                    backgroundColor: "#797979",
                }}
            />

            <View style={styles.headerContainer}>
                <Text style={[Fonts.subtext, styles.header]}>
                    Recent Orders
                </Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.statusTabs}
            >
                {statusOptions.map((status) => {
                    const iconSource =
                        status === "For Approval"
                            ? require("../assets/Images/icons/forApproval.png")
                            : status === "To ship"
                            ? require("../assets/Images/icons/toShip.png")
                            : status === "Shipped"
                            ? require("../assets/Images/icons/shipped.png")
                            : require("../assets/Images/icons/delivered.png");

                    return (
                        <TouchableOpacity
                            key={status}
                            activeOpacity={0.8}
                            style={[
                                styles.statusButton,
                                selectedStatus === status &&
                                    styles.activeStatusButton,
                            ]}
                            onPress={() => setSelectedStatus(status)}
                        >
                            <View style={styles.iconTextWrapper}>
                                <Image
                                    source={iconSource}
                                    style={styles.statusIcon}
                                />
                                <Text
                                    style={[
                                        Fonts.regular,
                                        selectedStatus === status &&
                                            styles.activeStatusText,
                                    ]}
                                >
                                    {status}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {userData?.id ? (
                <OrderStatusCard
                    userId={userData.id}
                    statusFilter={statusMap[selectedStatus]}
                    onPress={(item) =>
                        navigation.navigate("CancelOrder", {
                            item,
                            address: userData?.address || "No address provided",
                        })
                    }
                />
            ) : (
                <Text
                    style={[
                        Fonts.regular,
                        { textAlign: "center", marginTop: 20 },
                    ]}
                >
                    Loading recent orders...
                </Text>
            )}
        </SafeAreaView>
    );
};

export default Profile;
