import { View, Text, StatusBar, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/CartStyle";
import DefaultHeader from "../components/DefaultHeader";
import CartCard from "../components/CartCard";
import ProductBtn from "../components/ProductBtn";
import Fonts from "../constants/Fonts";
import fallbackImage from "../assets/Images/product/fallbackImage.png";
import React, { useState, useContext } from "react";
import { getCart, removeItemFromCart } from "../api/cartHooks";
import { AuthContext } from "../context/authContext";

const Cart = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [cartId, setCartId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        try {
            setLoading(true);
            console.log("📦 Fetching cart for user:", user?._id);

            const userCart = await getCart(user._id);
            console.log("🧪 Raw cart response:", userCart);

            if (userCart && Array.isArray(userCart.items)) {
                const items = userCart.items
                    .map((item, index) => {
                        const { product, quantity, selected } = item;

                        const {
                            _id,
                            productName,
                            price,
                            image,
                            specification,
                            category,
                            stock,
                        } = item.product || {};

                        if (!_id || !productName || price === undefined) {
                            console.warn(
                                `⚠️ Incomplete product data at index ${index}:`,
                                item
                            );
                            return null;
                        }

                        const hasImage =
                            typeof image === "string" && image.trim() !== "";
                        if (!hasImage) {
                            console.log(
                                `🖼️ Using fallback image for product: ${productName}`
                            );
                        }

                        const mappedItem = {
                            _id: item._id, // ✅ cart item ID
                            productId: product._id,
                            name: productName,
                            price,
                            specification: specification || "",
                            category: category || "",
                            quantity: quantity || 1,
                            stock: stock || 0,
                            image:
                                typeof image === "string" && image.trim() !== ""
                                    ? { uri: image }
                                    : fallbackImage,
                            rate: "4.5",
                            review: "12",
                        };

                        console.log("🧩 Mapped cart item:", mappedItem);
                        return mappedItem;
                    })
                    .filter(Boolean);

                setCartItems(items);
                setCartId(userCart._id);
            } else {
                console.warn("🛒 Cart is empty or malformed:", userCart);
                setCartItems([]);
                setCartId(null);
            }
        } catch (err) {
            console.error("❌ Error fetching cart:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (cartItemId) => {
        try {
            if (!cartId || !cartItemId) {
                console.warn(
                    "⚠️ Missing cartId or cartItemId. Cannot proceed with removal."
                );
                return;
            }

            const url = `https://api-motoxelerate.onrender.com/api/cart/${cartId}/remove`;
            console.log(`🧪 Calling: ${url} with itemId: ${cartItemId}`);

            const res = await removeItemFromCart({
                cartId,
                itemId: cartItemId,
            });

            if (!res || !Array.isArray(res.items)) {
                console.warn(
                    "⚠️ Unexpected response from removeItemFromCart:",
                    res
                );
                return;
            }

            // ✅ Map updated items and update state
            const updatedItems = res.items
                .map((item, index) => {
                    const {
                        _id,
                        productName,
                        price,
                        image,
                        specification,
                        category,
                        stock,
                        quantity,
                    } = item;

                    if (!_id || !productName || price === undefined) {
                        console.warn(
                            `⚠️ Incomplete product data at index ${index}:`,
                            item
                        );
                        return null;
                    }

                    const hasImage =
                        typeof image === "string" && image.trim() !== "";
                    if (!hasImage) {
                        console.log(
                            `🖼️ Using fallback image for product: ${productName}`
                        );
                    }

                    return {
                        _id,
                        name: productName,
                        price,
                        specification: specification || "",
                        category: category || "",
                        quantity: quantity || 1,
                        stock: stock || 0,
                        image: hasImage ? { uri: image } : fallbackImage,
                        rate: "4.5",
                        review: "12",
                    };
                })
                .filter(Boolean);

            setCartItems(updatedItems);
            setSelectedProducts((prevSelected) =>
                prevSelected.filter((item) => item._id !== cartItemId)
            );

            console.log(
                `✅ Cart state updated with ${updatedItems.length} items after removal.`
            );
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err.message ||
                "Unknown error";
            console.error("❌ Error removing item:", message);
        }
    };

    const getTotal = () => {
        return (
            selectedProducts.reduce((total, item) => {
                const rawPrice = item.price ?? 0;
                const price =
                    typeof rawPrice === "string"
                        ? parseFloat(rawPrice.replace(/[^\d.]/g, "") || "0")
                        : Number(rawPrice);
                return total + price * item.quantity;
            }, 0) || 0
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchCart();
        }, [])
    );

    const toggleSelectItem = (product) => {
        console.log("🧩 Toggling selection for product:", product);

        const isSelected = selectedProducts.some((p) => p._id === product._id);

        if (isSelected) {
            // ✅ Deselect by removing from selectedProducts
            setSelectedProducts((prev) =>
                prev.filter((p) => p._id !== product._id)
            );
            console.log("❎ Deselected:", product.name);
        } else {
            const initialQty = product.quantity || 1;
            const stock = typeof product.stock === "number" ? product.stock : 0;

            if (stock <= 0) {
                console.warn(`⚠️ Product "${product.name}" has zero stock.`);
            }

            const safeQty = Math.min(initialQty, stock);

            if (stock > 0 && initialQty > stock) {
                Alert.alert(
                    "Stock Limit Reached",
                    `Maximum quantity for ${
                        product.name || product.product_Name || "this product"
                    } is ${stock}.`
                );
            }

            setSelectedProducts((prev) => [
                ...prev,
                {
                    ...product,
                    quantity: safeQty,
                    productId: product.productId || product._id,
                },
            ]);
            console.log("✅ Selected:", product.name);
        }
    };

    const updateQuantity = (productId, newQty) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item._id !== productId) return item;

                const maxStock =
                    typeof item.stock === "number" ? item.stock : 0;

                if (maxStock === 0) {
                    console.warn(
                        `⚠️ Cannot update quantity — "${item.name}" is out of stock.`
                    );
                    Alert.alert(
                        "Out of Stock",
                        `${
                            item.name || "This product"
                        } is currently out of stock.`
                    );
                    return item;
                }

                const safeQty = Math.min(newQty, maxStock);

                if (newQty > maxStock) {
                    console.warn(
                        `⚠️ Tried to set quantity (${newQty}) above stock (${maxStock}) for product: ${item.name}`
                    );
                    Alert.alert(
                        "Stock Limit Reached",
                        `Maximum quantity for ${
                            item.name || "this product"
                        } is ${maxStock}.`
                    );
                }

                return { ...item, quantity: safeQty };
            })
        );

        setSelectedProducts((prevSelected) =>
            prevSelected.map((item) => {
                if (item._id !== productId) return item;

                const maxStock =
                    typeof item.stock === "number" ? item.stock : 0;

                if (maxStock === 0) return item;

                const safeQty = Math.min(newQty, maxStock);
                return { ...item, quantity: safeQty };
            })
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <DefaultHeader
                title={"My Cart"}
                notifPress={() => navigation.navigate("Notification")}
                chatPress={() => console.log("Chat Pressed")}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.cardWrapper}
                contentContainerStyle={{ paddingVertical: 20 }}
            >
                {cartItems.length === 0 ? (
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 17,
                            color: "#888",
                            marginTop: 40,
                            fontFamily: Fonts.regular.fontFamily,
                        }}
                    >
                        Your cart is empty
                    </Text>
                ) : (
                    cartItems.map((product) => (
                        <CartCard
                            key={product._id}
                            product={product}
                            onPress={() =>
                                navigation.navigate("ProductDetails", {
                                    product,
                                })
                            }
                            onRemove={() => handleRemove(product._id)}
                            isSelected={selectedProducts.some(
                                (p) => p._id === product._id
                            )}
                            onToggleSelect={() => toggleSelectItem(product)}
                            onQuantityChange={(newQty) =>
                                updateQuantity(product._id, newQty)
                            }
                        />
                    ))
                )}
            </ScrollView>

            <View style={styles.buttonWrapper}>
                <View style={{ marginLeft: 18 }}>
                    <Text style={[Fonts.title, styles.totalPrice]}>
                        Total Price
                    </Text>
                    <Text style={[Fonts.semibold, styles.price]}>
                        ₱{getTotal().toLocaleString()}
                    </Text>
                </View>
                <View style={styles.breakLine} />
                <ProductBtn
                    name={"Checkout"}
                    backgroundColor={"#fff"}
                    onPress={() =>
                        navigation.navigate("Checkout", {
                            selectedProducts, // ✅ full product objects
                        })
                    }
                    width={165}
                    fontSize={16}
                    color={"#000000"}
                    btnIcon={require("../assets/Images/bag.png")}
                />
            </View>
        </SafeAreaView>
    );
};

export default Cart;
