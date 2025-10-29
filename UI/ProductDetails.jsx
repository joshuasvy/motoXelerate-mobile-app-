import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/ProductStyle";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import BreakLine from "../components/BreakLine";
import RecommendedProdCard from "../components/RecommendedProdCard";
import ProductBtn from "../components/ProductBtn";
import CustomModal from "../components/CustomModal";
import { useRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";

const ProductDetails = ({ navigation }) => {
  const { addToCart } = useCart();
  const route = useRoute();
  const { product } = route.params || {};
  const [cartModal, setCartModal] = useState(false);

  if (!product) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No product data found.</Text>
      </View>
    );
  }

  const handleCart = () => {
    addToCart(product);
    setCartModal(true);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigation.navigate("Tab", { screen: "Cart" });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
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
          <View style={{ marginBottom: 10 }}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
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
                  { fontSize: 11, letterSpacing: 1, color: "#797979" },
                ]}
              >
                {product.rate} {`(${product.review} reviews)`}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[Fonts.semibold, { fontSize: 20 }]}>
              ₱ {product.price}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  Fonts.minitext,
                  { fontSize: 11, letterSpacing: 1, color: "#797979" },
                ]}
              >
                Stocks: <Text>{product.stock}</Text>
              </Text>
            </View>
          </View>
          <Text style={[Fonts.subtext, { fontSize: 17, marginTop: 15 }]}>
            Specification
          </Text>
          <Text style={[Fonts.regular, { marginTop: 18 }]}>
            {product.specification}
          </Text>
          <BreakLine />
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[Fonts.subtext, { fontSize: 17 }]}>Reviews</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={[Fonts.minitext, { marginTop: 2 }]}>View All</Text>
                <Image
                  source={require("../assets/Images/next.png")}
                  style={{ width: 20, height: 20, marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.reviewContainer}>
              <View style={styles.cardWrapper}>
                <Image
                  source={require("../assets/Images/resume-pic.png")}
                  style={styles.imageWrap}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={[Fonts.semibold, { fontSize: 13 }]}>
                      John Doe
                    </Text>
                  </View>
                  <Text
                    style={[
                      Fonts.regular,
                      {
                        fontSize: 12,
                        maxWidth: "100%",
                        marginTop: 5,
                      },
                    ]}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
              </View>

              <View style={styles.cardWrapper}>
                <Image
                  source={require("../assets/Images/resume-pic.png")}
                  style={styles.imageWrap}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={[Fonts.semibold, { fontSize: 13 }]}>
                      John Doe
                    </Text>
                  </View>
                  <Text
                    style={[
                      Fonts.regular,
                      {
                        fontSize: 12,
                        maxWidth: "100%",
                        marginTop: 5,
                      },
                    ]}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <BreakLine />
          <Text style={[Fonts.subtext, { fontSize: 17 }]}>
            Related Products
          </Text>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: 10,
                gap: 12,
                paddingHorizontal: 10,
                // borderWidth: 1,
              }}
            >
              <RecommendedProdCard />
              <RecommendedProdCard />
              <RecommendedProdCard />
              <RecommendedProdCard />
            </ScrollView>
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
