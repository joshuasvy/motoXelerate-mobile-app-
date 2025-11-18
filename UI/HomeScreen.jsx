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
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { NotificationContext } from "../context/notificationContext";
import fallbackImage from "../assets/Images/product/fallbackImage.png";

const HomeScreen = ({ navigation }) => {
    const { unreadCount, fetchUnreadCount } = useContext(NotificationContext);
    const [search, setSearch] = useState("");

    // Category dropdown state
    const [catOpen, setCatOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([
        { label: "All Categories", value: "all" },
    ]);

    // Price dropdown state
    const [priceOpen, setPriceOpen] = useState(false);
    const [selectedPriceRange, setSelectedPriceRange] = useState("all");
    const [priceRanges, setPriceRanges] = useState([
        { label: "All Prices", value: "all" },
    ]);

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

            setProducts(mapped);
        } catch (err) {
            console.error("❌ Error fetching products or stats:", err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchUnreadCount();
        }, [fetchUnreadCount])
    );

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

    // Build dynamic categories
    useEffect(() => {
        const uniqueCats = [...new Set(products.map((p) => p.category))];
        setCategories([
            { label: "All Categories", value: "all" },
            ...uniqueCats.map((cat) => ({ label: cat, value: cat })),
        ]);
    }, [products]);

    // Build dynamic price ranges
    useEffect(() => {
        if (products.length > 0) {
            const prices = products.map((p) => p.price);
            const maxPrice = Math.max(...prices);
            const step = 500;
            const ranges = [];

            for (let start = 0; start <= maxPrice; start += step) {
                const end = start + step;
                ranges.push({
                    label: `₱${start} - ₱${end}`,
                    value: `${start}-${end}`,
                });
            }

            setPriceRanges([{ label: "All Prices", value: "all" }, ...ranges]);
        }
    }, [products]);

    // Filter products by search, category, and price
    const filteredProducts = useMemo(() => {
        const query = search.toLowerCase().trim();

        return products.filter((p) => {
            const matchesSearch =
                !query ||
                p.name?.toLowerCase().includes(query) ||
                p.specification?.toLowerCase().includes(query) ||
                p.category?.toLowerCase().includes(query);

            const matchesCategory =
                selectedCategory === "all" || p.category === selectedCategory;

            let matchesPrice = true;
            if (selectedPriceRange !== "all") {
                const [min, max] = selectedPriceRange.split("-").map(Number);
                matchesPrice = p.price >= min && p.price <= max;
            }

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [search, products, selectedCategory, selectedPriceRange]);

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
                zIndex: 0,
            }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponentStyle={{ zIndex: 1000, elevation: 1000 }}
            ListHeaderComponent={
                <SafeAreaView
                    edges={["top"]}
                    style={{ backgroundColor: "#fff" }}
                >
                    <StatusBar
                        translucent
                        backgroundColor="transparent"
                        barStyle="dark-content"
                    />

                    <View style={styles.header}>
                        <Image
                            source={require("../assets/Images/logo/motoxelerate.png")}
                            style={styles.logo}
                        />
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
                                <View style={{ position: "relative" }}>
                                    <Image
                                        source={require("../assets/Images/icons/notification.png")}
                                        style={{
                                            height: 35,
                                            width: 35,
                                            transform: [{ rotate: "20deg" }],
                                        }}
                                    />
                                    {typeof unreadCount === "number" &&
                                        unreadCount > 0 && (
                                            <View style={styles.badge}>
                                                <Text style={styles.badgeText}>
                                                    {unreadCount}
                                                </Text>
                                            </View>
                                        )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Category and Price Range Dropdown */}
                    <View style={styles.categoryWrapper}>
                        <View style={styles.categoryDropdown}>
                            <DropDownPicker
                                open={catOpen}
                                value={selectedCategory}
                                items={categories}
                                setOpen={setCatOpen}
                                setValue={setSelectedCategory}
                                setItems={setCategories}
                                placeholder="Select category"
                                style={{
                                    backgroundColor: "#fffefeff",
                                    borderRadius: 8,
                                    borderColor: "#e0e0e0ff",
                                }}
                                dropDownContainerStyle={{
                                    borderColor: "#e0e0e0ff",
                                    zIndex: 2000,
                                    elevation: 2000,
                                }}
                            />
                        </View>

                        <View style={styles.priceDropdown}>
                            <DropDownPicker
                                open={priceOpen}
                                value={selectedPriceRange}
                                items={priceRanges}
                                setOpen={setPriceOpen}
                                setValue={setSelectedPriceRange}
                                setItems={setPriceRanges}
                                placeholder="Select price range"
                                style={{
                                    backgroundColor: "#fffefeff",
                                    borderRadius: 8,
                                    borderColor: "#e0e0e0ff",
                                }}
                                dropDownContainerStyle={{
                                    borderColor: "#e0e0e0ff",
                                    zIndex: 1000,
                                    elevation: 1000,
                                }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
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
