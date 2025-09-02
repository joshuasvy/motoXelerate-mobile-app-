import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import styles from "../styles/ProductStyle";
import Colors from "../constants/Colors";
import fonts from "../constants/Fonts";
import BreakLine from "../components/BreakLine";
import RecommendedProdCard from "../components/RecommendedProdCard";
import ProductBtn from "../components/ProductBtn";
import CustomModal from "../components/CustomModal";
import VariantSelection from "../components/VariantSelection";
import React, { useState } from "react";

const ProductDetails = ({ navigation }) => {
  const [cartModal, setCartModal] = useState(false);
  const [buyModal, setBuyModal] = useState(false);

  const openBuyModal = () => setBuyModal(true);
  const closeBuyModal = () => setBuyModal(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets/Images/testingImage.jpg")}
            style={styles.imageStyle}
          />
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[fonts.title, { fontSize: 22 }]}>Product Name</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/Images/star.png")}
                style={{ width: 15, height: 15, marginRight: 5 }}
              />
              <Text
                style={[
                  fonts.minitext,
                  { fontSize: 11, letterSpacing: 1, color: "#797979" },
                ]}
              >
                4.5 <Text>(28 reviews)</Text>
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
            <Text style={[fonts.semibold, { fontSize: 20 }]}>₱ 999.99</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  fonts.minitext,
                  { fontSize: 11, letterSpacing: 1, color: "#797979" },
                ]}
              >
                Stocks <Text>(5)</Text>
              </Text>
            </View>
          </View>
          <Text style={[fonts.subtext, { fontSize: 17, marginTop: 18 }]}>
            Description
          </Text>
          <Text style={[fonts.regular, { marginTop: 18 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <BreakLine />
          <Text style={[fonts.subtext, { fontSize: 17 }]}>Specification</Text>
          <Text style={[fonts.regular, { marginTop: 18 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
              <Text style={[fonts.subtext, { fontSize: 17 }]}>Reviews</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={[fonts.minitext, { marginTop: 2 }]}>View All</Text>
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
                    <Text style={[fonts.semibold, { fontSize: 13 }]}>
                      John Doe
                    </Text>
                  </View>
                  <Text
                    style={[
                      fonts.regular,
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
                    <Text style={[fonts.semibold, { fontSize: 13 }]}>
                      John Doe
                    </Text>
                  </View>
                  <Text
                    style={[
                      fonts.regular,
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
          <Text style={[fonts.subtext, { fontSize: 17 }]}>
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
          onPress={() => setCartModal(true)}
        />
        <ProductBtn
          backgroundColor={colors.primary}
          name={"Buy Now"}
          fontSize={16}
          width={165}
          btnIcon={require("../assets/Images/bag.png")}
          onPress={openBuyModal}
        />
      </View>
      <CustomModal visibility={cartModal} onPress={() => setCartModal(false)} />
      <VariantSelection visibility={buyModal} onClose={closeBuyModal} />
    </SafeAreaView>
  );
};

export default ProductDetails;
