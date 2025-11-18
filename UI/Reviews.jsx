import {
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    Text,
    Image,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import DefaultHeader from "../components/DefaultHeader";
import ReviewCard from "../components/ReviewCard"; // ✅ reuse your dynamic card

const Reviews = ({ navigation, route }) => {
    const { productId } = route.params;
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [average, setAverage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const fetchReviews = async () => {
        try {
            console.log("🔄 Fetching reviews for:", productId);
            const res = await axios.get(
                `https://api-motoxelerate.onrender.com/api/review/product/${productId}`
            );

            setReviews(res.data);

            // ✅ Calculate average rating
            const total = res.data.reduce((sum, r) => sum + r.rate, 0);
            const avg = res.data.length ? total / res.data.length : 0;
            setAverage(avg.toFixed(1));
        } catch (err) {
            console.error("❌ Failed to fetch reviews:", err.message);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Initial fetch on mount
    useEffect(() => {
        fetchReviews();
    }, [productId]);

    // ✅ Pull-to-refresh handler
    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchReviews();
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={styles.safeContainer} edges={["top"]}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.container}
            >
                <DefaultHeader
                    title={"Reviews"}
                    backIcon={require("../assets/Images/icons/back.png")}
                    back={"Back"}
                    goBack={() => navigation.goBack()}
                />
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={styles.customer}>Customer Reviews</Text>

                    <View style={styles.rateWrapper}>
                        <View style={styles.starWrapper}>
                            {Array.from({ length: 5 }, (_, i) => {
                                const filled = i + 1 <= Math.floor(average);
                                const half =
                                    i + 1 === Math.ceil(average) &&
                                    average % 1 >= 0.5;
                                return (
                                    <Image
                                        key={i}
                                        source={
                                            filled
                                                ? require("../assets/Images/icons/starFill.png")
                                                : half
                                                ? require("../assets/Images/icons/starHalf.png")
                                                : require("../assets/Images/icons/starOutline.png")
                                        }
                                        style={styles.starIcon}
                                    />
                                );
                            })}
                        </View>
                        <Text style={styles.rate}>
                            {average} ({reviews.length} Reviews)
                        </Text>
                    </View>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color={Colors.primary}
                        />
                    ) : (
                        <ReviewCard reviews={reviews} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Reviews;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    customer: {
        fontFamily: Fonts.header.fontFamily,
        fontSize: 23,
        marginVertical: 10,
    },
    rateWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginBottom: 25,
    },
    starWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginRight: 5,
    },
    starIcon: {
        width: 20,
        height: 20,
        marginRight: 3,
    },
    rate: {
        fontFamily: Fonts.minitext.fontFamily,
        fontSize: 13,
        color: "#797979",
    },

    cardWrapper: {
        flexDirection: "row",
        marginBottom: 3,
        gap: 10,
        position: "relative",
    },
    imageWrap: {
        width: 80,
        height: 80,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    starReview: {
        width: 12,
        height: 12,
    },
    name: {
        width: 250,
        fontFamily: Fonts.subtext.fontFamily,
        fontSize: 16,
    },
    reviewText: {
        width: 250,
        height: 53,
        fontFamily: Fonts.regular.fontFamily,
        fontSize: 12,
        position: "absolute",
        bottom: 0,
    },
});
