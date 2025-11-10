import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import styles from "../styles/HistoryDetailsStyle";
import Fonts from "../constants/Fonts";
import Header from "../components/DefaultHeader";
import BreakLine from "../components/BreakLine";
import { AuthContext } from "../context/authContext";

const StatusDetails = ({ navigation, route }) => {
    const { user } = useContext(AuthContext);
    const item = route?.params?.item;

    console.log("📨 route.params:", route?.params);
    console.log("🧩 item:", item);
    console.log("👤 user from context:", user);
    console.log("🖼️ item.image:", item?.image);

    if (!item || !item.productName || !item.image) {
        return (
            <SafeAreaView style={styles.container}>
                <Text
                    style={[
                        Fonts.regular,
                        { textAlign: "center", marginTop: 50 },
                    ]}
                >
                    Order details missing or incomplete.
                </Text>
            </SafeAreaView>
        );
    }

    const safePrice =
        typeof item.price === "string"
            ? parseFloat(item.price.replace(/[^\d.]/g, "") || "0")
            : Number(item.price);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <Header
                title={"Order Details"}
                backIcon={require("../assets/Images/icons/back.png")}
                back={"Back"}
                goBack={() => navigation.goBack()}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 15 }}
            >
                <View style={styles.bannerWrapper}>
                    <View style={{ alignItems: "center" }}>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.productImage}
                                onError={(e) => {
                                    console.warn(
                                        "❌ Image failed to load:",
                                        e.nativeEvent.error
                                    );
                                }}
                                onLoad={() => {
                                    console.log("✅ Image loaded successfully");
                                }}
                            />
                        </View>

                        <Text
                            style={{
                                fontSize: 10,
                                color: "gray",
                                marginTop: 5,
                            }}
                        ></Text>
                    </View>
                </View>

                <View style={styles.infoWrapper}>
                    <Text
                        numberOfLines={2}
                        style={[Fonts.semibold, { fontSize: 25 }]}
                    >
                        {item.productName}
                    </Text>
                    <Text style={[Fonts.subtext, { fontSize: 23 }]}>
                        ₱ {safePrice.toLocaleString()}
                    </Text>
                    <Text
                        style={[Fonts.subtext, { fontSize: 18, marginTop: 15 }]}
                    >
                        Description
                    </Text>
                    <Text
                        style={[Fonts.regular, { fontSize: 14, marginTop: 5 }]}
                    >
                        {item.specification || "No description provided"}
                    </Text>
                </View>

                <BreakLine />
                <Text style={[Fonts.subtext, { fontSize: 18 }]}>Address</Text>
                <Text style={[Fonts.regular, { fontSize: 14, marginTop: 5 }]}>
                    {user?.address || "No address provided"}
                </Text>

                <BreakLine />
                <Text style={[Fonts.subtext, { fontSize: 17 }]}>
                    Payment Transaction
                </Text>
                <View style={styles.infopaymentWrapper}>
                    <Image
                        source={require("../assets/Images/logo/gcash.png")}
                        style={styles.gcashlogo}
                    />
                    <Text style={[Fonts.regular, { fontSize: 14 }]}>
                        {user?.contact || "No payment number"}
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        navigation.navigate("WriteaReview", {
                            productId: item.productId,
                            orderId: item.orderId,
                            productName: item.productName,
                            image: item.image,
                        })
                    }
                    style={styles.reviewBtn}
                >
                    <Image
                        source={require("../assets/Images/icons/pen.png")}
                        style={styles.reviewIcon}
                    />
                    <Text
                        style={[Fonts.subtext, { fontSize: 16, color: "#fff" }]}
                    >
                        Write a Review
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StatusDetails;
