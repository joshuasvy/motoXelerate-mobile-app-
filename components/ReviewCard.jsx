import { StyleSheet, Text, Image, View } from "react-native";
import Fonts from "../constants/Fonts";

const ReviewCard = ({ reviews = [] }) => {
    if (!reviews.length) return null;

    return (
        <View style={styles.container}>
            {reviews.map((r) => (
                <View key={r._id} style={styles.cardWrapper}>
                    <Image
                        source={
                            r.userId?.image
                                ? { uri: r.userId.image }
                                : require("../assets/Images/profile/defaultProfile.jpg")
                        }
                        style={styles.imageWrap}
                    />
                    <View style={styles.infoWrapper}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.name}
                        >
                            {r.userId
                                ? `${r.userId.firstName} ${r.userId.lastName}`
                                : "Anonymous"}
                        </Text>

                        <View style={{ flexDirection: "row", gap: 3 }}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <Image
                                    key={i}
                                    source={
                                        i < r.rate
                                            ? require("../assets/Images/icons/starFill.png")
                                            : require("../assets/Images/icons/starOutline.png")
                                    }
                                    style={styles.starReview}
                                />
                            ))}
                        </View>

                        <Text
                            numberOfLines={3}
                            ellipsizeMode="tail"
                            style={styles.reviewText}
                        >
                            {r.review}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default ReviewCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        gap: 10,
    },
    cardWrapper: {
        flexDirection: "row",
        gap: 10,
        position: "relative",
    },
    imageWrap: {
        width: 95,
        height: 95,
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
