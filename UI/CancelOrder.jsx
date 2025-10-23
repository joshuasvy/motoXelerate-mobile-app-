import { View, Text, StatusBar, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/CancelOrderStyle";
import Fonts from "../constants/Fonts";
import AddressWrapper from "../components/AddressWrapper";
import NormalCard from "../components/NormalCard";
import PaymentMethod from "../components/PaymentMethod";
import SimpleHeader from "../components/SimpleHeader";
import BreakLine from "../components/BreakLine";
import CancelCheckoutBtn from "../components/CancelCheckoutBtn";
import ProductBtn from "../components/ProductBtn";
import Colors from "../constants/Colors";
import CustomModal from "../components/CustomModal";
import React, { useState } from "react";

const CancelOrder = ({ navigation }) => {
  const [cancelOrder, setCancelOrder] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <SimpleHeader goBack={() => navigation.goBack()} />
      <AddressWrapper />
      <View style={{ marginTop: 25, marginVertical: 15 }}>
        <NormalCard
          display={require("../assets/Images/testingImage.jpg")}
          name={"Product Name"}
        />
      </View>
      <BreakLine />
      <PaymentMethod />
      <CancelCheckoutBtn />
    </SafeAreaView>
  );
};

export default CancelOrder;
