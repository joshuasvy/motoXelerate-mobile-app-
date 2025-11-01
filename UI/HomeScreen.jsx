import {
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/HomeStyle";
import Fonts from "../constants/Fonts";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import fallbackImage from "../assets/Images/product/fallbackImage.png"; // ✅ fallback image

const HomeScreen = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            console.log("📡 Fetching products from API...");
            const res = await axios.get(
                "https://api-motoxelerate.onrender.com/api/product"
            );

            if (!Array.isArray(res.data)) {
                console.warn(
                    "⚠️ Unexpected product response format:",
                    res.data
                );
                return;
            }

            const mapped = res.data.map((p, index) => {
                const fallbackUsed = !p.image;
                if (fallbackUsed) {
                    console.log(
                        `🖼️ Using fallback image for product at index ${index}:`,
                        p.productName
                    );
                }

                return {
                    id: p._id,
                    name: p.productName,
                    image: p.image ? { uri: p.image } : fallbackImage,
                    price: p.price,
                    stock: p.stock?.toString() || "0",
                    category: p.category,
                    specification: p.specification,
                    rate: "4.5", // placeholder
                    review: "12", // placeholder
                };
            });

            console.log("✅ Products mapped:", mapped);
            setProducts(mapped);
        } catch (err) {
            console.error("❌ Error fetching products:", err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <View style={styles.header}>
                <View style={styles.logo} />
                <TextInput
                    style={[Fonts.regular, styles.input]}
                    placeholder={"Search..."}
                    value={search}
                    onChangeText={setSearch}
                />
                <Image
                    source={require("../assets/Images/search.png")}
                    style={styles.searchIcon}
                />
                <View style={styles.headerIcons}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("Notification")}
                    >
                        <Image
                            source={require("../assets/Images/notif.png")}
                            style={{ height: 28, width: 28 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Image
                            source={require("../assets/Images/chat.png")}
                            style={{ height: 28, width: 28 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={[Fonts.header, { alignSelf: "center" }]}>
                MOTOXELERATE
            </Text>

            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        marginHorizontal: 15,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 13,
                    }}
                >
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ProductCard
                                product={item}
                                onPress={() =>
                                    navigation.navigate("Products", {
                                        product: { ...item, _id: item.id },
                                    })
                                }
                            />
                        )}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                            marginBottom: 4,
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
};

export default HomeScreen;
