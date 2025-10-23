import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/HistoryDetailsStyle";
import Fonts from "../constants/Fonts";
import Header from "../components/DefaultHeader";
import BreakLine from "../components/BreakLine";
import React from "react";

const StatusDetails = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <Header
        title={"Order Details"}
        backIcon={require("../assets/Images/back.png")}
        back={"Back"}
        goBack={() => navigation.goBack()}
      />
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.bannerWrapper}>
          <Image
            source={require("../assets/Images/banners/testBanner1.jpg")}
            style={styles.productImage}
          />
        </View>
        <View style={styles.infoWrapper}>
          <Text style={[Fonts.subtext, { fontSize: 22 }]}>Product Name</Text>
          <Text style={[Fonts.regular, { fontSize: 14, marginTop: 5 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text style={[Fonts.subtext, { fontSize: 18, marginTop: 15 }]}>
            Specification
          </Text>
          <Text style={[Fonts.regular, { fontSize: 14, marginTop: 5 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <BreakLine />
        <Text style={[Fonts.subtext, { fontSize: 18 }]}>Address</Text>
        <Text style={[Fonts.regular, { fontSize: 14, marginTop: 5 }]}>
          Blk 13 Lot 82 Phase 3F Lorem ipsum Consectetur adipiscing
        </Text>
        <BreakLine />
        <Text style={[Fonts.subtext, { fontSize: 17 }]}>
          Payment Transaction
        </Text>
        <View style={styles.infopaymentWrapper}>
          <Image
            source={require("../assets/Images/logo/gcash.png")}
            style={styles.gcashlogo}
          />
          <Text style={[Fonts.regular, { fontSize: 14 }]}>
            +63 909 2122 232
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("WriteaReview")}
          style={styles.reviewBtn}
        >
          <Image
            source={require("../assets/Images/pencil.png")}
            style={styles.reviewIcon}
          />
          <Text style={[Fonts.semibold, { fontSize: 15, marginLeft: 8 }]}>
            Write a Review
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StatusDetails;
