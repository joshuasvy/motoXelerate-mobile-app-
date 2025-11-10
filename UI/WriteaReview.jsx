import {
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import axios from "axios";
import styles from "../styles/WriteaReviewStyle";
import Fonts from "../constants/Fonts";
import { AuthContext } from "../context/authContext";

const WriteaReview = ({ navigation, route }) => {
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const { productId, orderId, productName, image } = route?.params || {};

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => {
            const starIndex = i + 1;
            const isFilled = starIndex <= rating;
            return (
                <TouchableOpacity
                    key={starIndex}
                    activeOpacity={0.8}
                    onPress={() => setRating(starIndex)}
                >
                    <Image
                        source={
                            isFilled
                                ? require("../assets/Images/icons/starFill.png")
                                : require("../assets/Images/icons/starOutline.png")
                        }
                        style={styles.starIcon}
                    />
                </TouchableOpacity>
            );
        });
    };

    const handlePostReview = async () => {
        // 🔒 Validate input
        const trimmedReview = reviewText.trim();
        if (!rating || !trimmedReview) {
            Alert.alert(
                "Missing Fields",
                "Please select a rating and write a review."
            );
            return;
        }

        const payload = {
            orderId,
            productId,
            userId: user?._id,
            rate: rating,
            review: trimmedReview,
        };

        try {
            console.log("📤 Submitting review payload:", payload);

            const response = await axios.post(
                "https://api-motoxelerate.onrender.com/api/review",
                payload
            );

            console.log("✅ Review submitted successfully:", response.data);

            Alert.alert("Success", "Your review has been posted.");
            navigation.navigate("Tab", { screen: "Profile" });
        } catch (err) {
            const status = err.response?.status;
            const message = err.response?.data?.message || err.message;

            console.error("❌ Review submission failed:", {
                status,
                message,
                stack: err.stack,
            });

            if (status === 409) {
                Alert.alert(
                    "Already Reviewed",
                    "You've already submitted a review for this order."
                );
            } else {
                Alert.alert(
                    "Error",
                    "Failed to submit review. Please try again."
                );
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <View style={{ paddingHorizontal: 15 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                        style={styles.headerWrapper}
                    >
                        <Image
                            source={require("../assets/Images/icons/back.png")}
                            style={styles.backIcon}
                        />
                        <Text
                            style={[
                                Fonts.regular,
                                { fontSize: 18, marginTop: 3 },
                            ]}
                        >
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.reviewWrapper}>
                    <Text style={[Fonts.subtext]}>Review</Text>
                    <View style={styles.starBtn}>{renderStars()}</View>
                </View>

                <TextInput
                    placeholder="Write a review here..."
                    style={styles.textInput}
                    multiline
                    value={reviewText}
                    onChangeText={setReviewText}
                />

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handlePostReview}
                    style={styles.postBtn}
                >
                    <Text
                        style={[
                            Fonts.subtext,
                            { textAlign: "center", marginTop: 5 },
                        ]}
                    >
                        Post
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default WriteaReview;
