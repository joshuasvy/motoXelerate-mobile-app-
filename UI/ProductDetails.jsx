import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/ProductStyle";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import ProductBtn from "../components/ProductBtn";
import CustomModal from "../components/CustomModal";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { addToCart } from "../api/cartHooks";

const ProductDetails = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const route = useRoute();
    const { product } = route.params || {};
    const [cartModal, setCartModal] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!product) {
        return (
            <View style={{ padding: 20 }}>
                <Text>No product data found.</Text>
            </View>
        );
    }

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
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
                                source={require("../assets/Images/back.png")}
                                style={{ width: 38, height: 38 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => console.log("Notification Clicked")}
                        >
                            <Image
                                source={require("../assets/Images/notif.png")}
                                style={{ width: 26, height: 26 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ padding: 15 }}>
                    <Text
                        numberOfLines={2}
                        style={[Fonts.title, { fontSize: 21 }]}
                    >
                        {product.name}
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 6,
                        }}
                    >
                        <Image
                            source={require("../assets/Images/star.png")}
                            style={{ width: 15, height: 15, marginRight: 5 }}
                        />
                        <Text
                            style={[
                                Fonts.minitext,
                                { fontSize: 11, color: "#797979" },
                            ]}
                        >
                            {product.rate} ({product.review} reviews)
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 10,
                        }}
                    >
                        <Text style={[Fonts.semibold, { fontSize: 20 }]}>
                            ₱ {product.price}
                        </Text>
                        <Text
                            style={[
                                Fonts.minitext,
                                { fontSize: 11, color: "#797979" },
                            ]}
                        >
                            Stocks: {product.stock}
                        </Text>
                    </View>

                    <Text
                        style={[Fonts.subtext, { fontSize: 17, marginTop: 15 }]}
                    >
                        Specification
                    </Text>
                    <Text style={[Fonts.regular, { marginTop: 10 }]}>
                        {product.specification}
                    </Text>

                    <Text
                        style={[Fonts.subtext, { fontSize: 17, marginTop: 25 }]}
                    >
                        Reviews
                    </Text>
                    {[1, 2].map((_, index) => (
                        <View key={index} style={styles.cardWrapper}>
                            <Image
                                source={require("../assets/Images/resume-pic.png")}
                                style={styles.imageWrap}
                            />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text
                                    style={[Fonts.semibold, { fontSize: 13 }]}
                                >
                                    John Doe
                                </Text>
                                <Text
                                    style={[
                                        Fonts.regular,
                                        { fontSize: 12, marginTop: 5 },
                                    ]}
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </Text>
                            </View>
                        </View>
                    ))}
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
