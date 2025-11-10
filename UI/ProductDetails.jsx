import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/ProductStyle";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import ProductBtn from "../components/ProductBtn";
import CustomModal from "../components/CustomModal";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { addToCart } from "../api/cartHooks";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import BreakLine from "../components/BreakLine";

const ProductDetails = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const route = useRoute();
    const { product } = route.params || {};
    const [cartModal, setCartModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    if (!product) {
        return (
            <View style={{ padding: 20 }}>
                <Text>No product data found.</Text>
            </View>
        );
    }

    const fetchReviews = async () => {
        try {
            console.log("🔍 Fetching reviews for:", product._id);
            const res = await axios.get(
                `https://api-motoxelerate.onrender.com/api/review/product/${product._id}`
            );
            console.log("✅ Reviews fetched:", res.data);
            setReviews(res.data);

            const total = res.data.reduce((sum, r) => sum + r.rate, 0);
            const avg = res.data.length ? total / res.data.length : 0;
            setAverageRating(avg.toFixed(1));
        } catch (err) {
            console.error("❌ Failed to fetch reviews:", err.message);
        } finally {
            setLoadingReviews(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [product._id]);

    const handleCart = async () => {
        console.log("🧪 Debug: user._id =", user?._id);
        console.log("🧪 Debug: product._id =", product?._id);

        if (!user?._id || !product?._id) {
            Alert.alert("Missing user or product information.");
            return;
        }

        try {
            setLoading(true);

            await addToCart({
                userId: user._id,
                product: product._id,
            });

            setCartModal(true);
        } catch (err) {
            console.error(
                "❌ Failed to add to cart:",
                err.response?.data || err.message
            );
            Alert.alert("Error", "Could not add item to cart.");
        } finally {
            setLoading(false);
        }
    };

    const handleBuyNow = async () => {
        try {
            await addToCart({
                userId: user._id,
                product: product._id,
            });
            navigation.navigate("Tab", { screen: "Cart" });
        } catch (err) {
            console.error(
                "❌ Failed to buy now:",
                err.response?.data || err.message
            );
            Alert.alert("Error", "Could not proceed to checkout.");
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchReviews(); // reuse your existing fetch logic
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <StatusBar
                    barStyle={"light-content"}
                    backgroundColor={"#fff"}
                />
                <View style={styles.imageWrapper}>
                    <Image source={product.image} style={styles.imageStyle} />
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.goBack()}
                            style={styles.backBtn}
                        >
                            <Image
                                source={require("../assets/Images/icons/back.png")}
                                style={styles.backIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => console.log("Notification Clicked")}
                        >
                            <Image
                                source={require("../assets/Images/icons/notif.png")}
                                style={styles.notifIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ padding: 15 }}>
                    <View style={styles.nameWrapper}>
                        <Text numberOfLines={2} style={styles.productName}>
                            {product.name}
                        </Text>
                        <Text style={styles.stocks}>
                            Stocks: {product.stock}
                        </Text>
                    </View>

                    <View style={styles.rateWrapper}>
                        <Image
                            source={require("../assets/Images/icons/starFill.png")}
                            style={styles.starIcon}
                        />
                        <Text style={styles.rate}>
                            {averageRating} ({reviews.length} reviews)
                        </Text>
                    </View>
                    <Text style={styles.price}>₱ {product.price}</Text>
                    <Text style={styles.specsWrapper}>Specification</Text>
                    <Text style={styles.specification}>
                        {product.specification?.trim() ||
                            "No specification provided."}
                    </Text>
                    <BreakLine />

                    <View style={styles.viewReviews}>
                        <Text style={styles.review}>Reviews</Text>
                        {reviews.length > 3 && (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    navigation.navigate("Reviews", {
                                        productId: product._id,
                                    })
                                }
                                style={styles.viewbtnWrapper}
                            >
                                <Text style={styles.viewAll}>View all</Text>
                                <Image
                                    source={require("../assets/Images/icons/next.png")}
                                    style={styles.nextIcon}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <ReviewCard reviews={reviews.slice(0, 3)} />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.buttonWrapper}>
                <ProductBtn
                    backgroundColor={"#fff"}
                    name={"Add to Cart"}
                    fontSize={15}
                    width={165}
                    btnIcon={require("../assets/Images/icons/cart.png")}
                    onPress={handleCart}
                />
                <ProductBtn
                    backgroundColor={Colors.primary}
                    name={"Buy Now"}
                    fontSize={16}
                    width={165}
                    btnIcon={require("../assets/Images/bag.png")}
                    onPress={handleBuyNow}
                />
            </View>

            <CustomModal
                visibility={cartModal}
                onPress={() => setCartModal(false)}
                iconModal={require("../assets/Images/icons/successful.png")}
                textModal={"Successfully added to Cart"}
            />
        </SafeAreaView>
    );
};

export default ProductDetails;
