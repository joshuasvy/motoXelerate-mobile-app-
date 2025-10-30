import { View, Text, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/CartStyle";
import DefaultHeader from "../components/DefaultHeader";
import CartCard from "../components/CartCard";
import ProductBtn from "../components/ProductBtn";
import Fonts from "../constants/Fonts";
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
      const userCart = await getCart(user._id);

      if (userCart) {
        const items = userCart.items.map((item) => {
          const product = item.productId;
          return {
            _id: product._id,
            name: product.product_Name,
            price: product.product_Price,
            specification: product.product_Specification,
            quantity: item.quantity || 1,
            stock: product.stock,
            image: product.image ? { uri: product.image } : placeholderImage,
          };
        });

        setCartItems(items);
        setCartId(userCart._id);
      } else {
        setCartItems([]);
        setCartId(null);
      }
    } catch (err) {
      console.error("❌ Error fetching cart:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      if (!cartId || !productId) return;

      const url = `https://api-motoxelerate.onrender.com/api/cart/${cartId}/remove`;
      console.log(`🧪 Calling: ${url} with productId: ${productId}`);

      await removeItemFromCart({ cartId, productId });

      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
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
        const price = parseFloat(item.price?.replace(/[^\d.]/g, "") || "0");
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
    console.log("Selected product:", product);
    const alreadySelected = selectedProducts.find((p) => p._id === product._id);

    if (alreadySelected) {
      // ✅ Deselect
      setSelectedProducts((prev) => prev.filter((p) => p._id !== product._id));
    } else {
      // ✅ Select and validate quantity vs stock
      const initialQty = product.quantity || 1;
      const safeQty = Math.min(initialQty, product.stock);

      if (initialQty > product.stock) {
        Alert.alert(
          "Stock Limit Reached",
          `Maximum quantity for ${
            product.name || product.product_Name || "this product"
          } is ${product.stock}.`
        );
      }

      setSelectedProducts((prev) => [
        ...prev,
        { ...product, quantity: safeQty },
      ]);
    }
  };

  const updateQuantity = (productId, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQty } : item
      )
    );

    setSelectedProducts((prevSelected) =>
      prevSelected.map((item) =>
        item._id === productId ? { ...item, quantity: newQty } : item
      )
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
              onPress={() => navigation.navigate("ProductDetails", { product })}
              onRemove={() => handleRemove(product._id)}
              isSelected={selectedProducts.some((p) => p._id === product._id)}
              onToggleSelect={() => toggleSelectItem(product)}
              onQuantityChange={(newQty) => updateQuantity(product._id, newQty)}
            />
          ))
        )}
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <View style={{ marginLeft: 18 }}>
          <Text style={[Fonts.title, styles.totalPrice]}>Total Price</Text>
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
