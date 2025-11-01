import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/ProfileStyle";
import DefaultHeader from "../components/DefaultHeader";
import Fonts from "../constants/Fonts";
import BreakLine from "../components/BreakLine";
import OrderStatusCard from "../components/OrderStatusCard";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Profile = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const userId = user?._id;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <DefaultHeader
                title={"Profile"}
                onPress={() => navigation.navigate("Notification")}
            />
            <View style={styles.profileContainer}>
                <Image
                    source={require("../assets/Images/resume-pic.png")}
                    style={styles.profilePic}
                />
                <View style={styles.infoContainer}>
                    <Text style={[Fonts.semibold, styles.username]}>
                        John Doe
                    </Text>
                    <Text style={[Fonts.regular, { fontSize: 14 }]}>
                        unicorn.me@example.com
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
            <BreakLine style={{ marginTop: 20 }} />
            <View style={styles.headerContainer}>
                <Text style={[Fonts.subtext, styles.header]}>
                    Recent Orders
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("OrderHistory")}
                    style={styles.historyWrapper}
                >
                    <Text style={[Fonts.regular]}>History</Text>
                    <Image
                        source={require("../assets/Images/history.png")}
                        style={styles.historyIcon}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.cardWrapper}
                showsVerticalScrollIndicator={false}
            >
                <OrderStatusCard
                    userId={user._id}
                    statusFilter={[
                        "Processing",
                        "To ship",
                        "Shipped",
                        "Delivered",
                    ]}
                    onPress={(item) =>
                        navigation.navigate("CancelOrder", {
                            item,
                            address: user?.address || "No address provided",
                        })
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
