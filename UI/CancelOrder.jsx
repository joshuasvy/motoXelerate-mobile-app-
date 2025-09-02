import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/CancelOrderStyle";
import Fonts from "../constants/Fonts";
import NormalCard from "../components/NormalCard";
import BreakLine from "../components/BreakLine";
import ProductBtn from "../components/ProductBtn";
import Colors from "../constants/Colors";
import React from "react";

const CancelOrder = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.backWrapper}
      >
        <Image
          source={require("../assets/Images/back.png")}
          style={styles.imageIcon}
        />
        <Text style={[Fonts.regular, { fontSize: 18, marginTop: 4 }]}>
          Back
        </Text>
      </TouchableOpacity>
      <View style={styles.addressWrapper}>
        <Text style={[Fonts.semibold, { fontSize: 19, marginTop: 5 }]}>
          Address
        </Text>
        <Text style={[fonts.regular, { fontSize: 13 }]}>
          Blk 13 Lot 82 Phase 3F Lorem ipsum Consectetur adipiscing
        </Text>
      </View>
      <View style={{ marginTop: 25, marginVertical: 15 }}>
        <NormalCard />
      </View>
      <BreakLine />
      <View style={styles.methodpaymentWrapper}>
        <Text style={[fonts.subtext, { fontSize: 17 }]}>Method of Payment</Text>
        <View style={styles.infopaymentWrapper}>
          <Image
            source={require("../assets/Images/logo/gcash.png")}
            style={styles.gcashlogo}
          />
          <Text style={[fonts.regular, { fontSize: 14 }]}>
            +63 909 2122 232
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <View style={styles.priceContainer}>
            <Text style={[Fonts.title, styles.totalPrice]}>Total Price</Text>
            <Text style={[Fonts.semibold, styles.price]}>₱99.99</Text>
          </View>
          <View style={styles.breakLine} />
          <ProductBtn
            name={"Cancel Order"}
            backgroundColor={Colors.secondary}
            onPress={() => console.log("Cancel Order Clicked")}
            width={170}
            color={"#fff"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CancelOrder;
