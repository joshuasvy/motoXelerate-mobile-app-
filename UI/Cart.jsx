import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import styles from "../styles/CartStyle";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import ProductBtn from "../components/ProductBtn";
import Fonts from "../constants/Fonts";
import React from "react";

const Cart = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <Header
        title={"My Cart"}
        onPress={() => navigation.navigate("Notification")}
        chatPress={() => console.log("Chat Pressed")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.cardWrapper}
      >
        <CartCard onPress={() => navigation.navigate("Products")} />
        <CartCard onPress={() => navigation.navigate("Products")} />
        <CartCard onPress={() => navigation.navigate("Products")} />
        <CartCard onPress={() => navigation.navigate("Products")} />
        <CartCard onPress={() => navigation.navigate("Products")} />
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <View style={styles.priceContainer}>
          <Text style={[Fonts.title, styles.totalPrice]}>Total Price</Text>
          <Text style={[Fonts.semibold, styles.price]}>₱99.99</Text>
        </View>
        <View style={styles.breakLine} />
        <ProductBtn
          name={"Checkout"}
          backgroundColor={"#fff"}
          onPress={() => console.log("Add to Cart Clicked")}
          width={165}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
