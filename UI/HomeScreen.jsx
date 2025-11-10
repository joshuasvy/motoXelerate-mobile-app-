import {
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/HomeStyle";
import Fonts from "../constants/Fonts";
import ProductCard from "../components/ProductCard";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import fallbackImage from "../assets/Images/product/fallbackImage.png";

const HomeScreen = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProducts = async () => {
        try {
            const [productRes, statsRes] = await Promise.all([
                axios.get("https://api-motoxelerate.onrender.com/api/product"),
                axios.get(
                    "https://api-motoxelerate.onrender.com/api/review/stats"
                ),
            ]);

            // 🔒 Defensive check for product response format
            if (!Array.isArray(productRes.data)) {
                console.warn("⚠️ Unexpected product response format");
                return;
            }

            const statsMap = {};
            statsRes.data.forEach((s) => {
                statsMap[s.productId] = {
                    average: s.average,
                    count: s.count,
                };
            });

            const mapped = productRes.data
                .map((p) => {
                    if (!p._id || !p.productName || p.price === undefined)
                        return null;

                    const stats = statsMap[p._id] || { average: 0, count: 0 };

                    return {
                        id: p._id,
                        name: p.productName,
                        image: p.image ? { uri: p.image } : fallbackImage,
                        price: p.price,
                        stock: p.stock?.toString() || "0",
                        category: p.category,
                        specification: p.specification,
                        rate: stats.average,
                        review: stats.count,
                    };
                })
                .filter(Boolean);

            // ✅ Log final product count
            console.log(
                `✅ Mapped ${mapped.length} products with review stats`
            );

            setProducts(mapped);
        } catch (err) {
            console.error("❌ Error fetching products or stats:", err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchProducts();
        } catch (err) {
            console.error("Error refreshing:", err.message);
        } finally {
            setRefreshing(false);
        }
    };

    const filteredProducts = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return products;

        return products.filter((product) => {
            const name = product.name?.toLowerCase() || "";
            const spec = product.specification?.toLowerCase() || "";
            const category = product.category?.toLowerCase() || "";
            return (
                name.includes(query) ||
                spec.includes(query) ||
                category.includes(query)
            );
        });
    }, [search, products]);

    return (
        <FlatList
            data={filteredProducts}
            keyExtractor={(item, index) =>
                item?.id?.toString() || `fallback-${index}`
            }
            renderItem={({ item }) =>
                item ? (
                    <ProductCard
                        product={item}
                        onPress={() =>
                            navigation.navigate("Products", {
                                product: { ...item, _id: item.id },
                            })
                        }
                    />
                ) : null
            }
            numColumns={2}
            columnWrapperStyle={{
                justifyContent: "space-between",
                marginHorizontal: 15,
                marginBottom: 4,
            }}
            contentContainerStyle={{
                paddingBottom: 20,
                backgroundColor: "#ffffff",
            }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
                <>
                    <View style={styles.header}>
                        <View style={styles.logo} />
                        <View>
                            <TextInput
                                style={[Fonts.regular, styles.input]}
                                placeholder="Search..."
                                value={search}
                                onChangeText={setSearch}
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="search"
                            />
                            <Image
                                source={require("../assets/Images/search.png")}
                                style={styles.searchIcon}
                            />
                        </View>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    navigation.navigate("Notification")
                                }
                            >
                                <Image
                                    source={require("../assets/Images/icons/notif.png")}
                                    style={{ height: 28, width: 28 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text
                        style={[
                            Fonts.header,
                            { alignSelf: "center", marginBottom: 10 },
                        ]}
                    >
                        MOTOXELERATE
                    </Text>
                </>
            }
            ListEmptyComponent={
                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 40,
                        fontSize: 16,
                        color: "#888",
                    }}
                >
                    No products found.
                </Text>
            }
        />
    );
};

export default HomeScreen;
