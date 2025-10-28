import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/CartStyle";
import DefaultHeader from "../components/DefaultHeader";
import CartCard from "../components/CartCard";
import ProductBtn from "../components/ProductBtn";
import Fonts from "../constants/Fonts";
import React, { useEffect, useState } from "react"; // ✅ fixed import
import { useCart } from "../context/CartContext";

const Cart = ({ navigation }) => {
  const { cartItems, getSelectedTotal, removeFromCart } = useCart(); // ✅ single clean useCart call
  const total = getSelectedTotal();

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
      >
        {cartItems.map((item) => (
          <CartCard
            key={item.id}
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
            onRemove={() => removeFromCart(item.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <View style={{ marginLeft: 18 }}>
          <Text style={[Fonts.title, styles.totalPrice]}>Total Price</Text>
          <Text style={[Fonts.semibold, styles.price]}>
            ₱{total.toLocaleString()}
          </Text>
        </View>
        <View style={styles.breakLine} />
        <ProductBtn
          name={"Checkout"}
          backgroundColor={"#fff"}
          onPress={() => navigation.navigate("Checkout")}
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
