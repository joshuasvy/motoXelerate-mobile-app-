import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/OrderStatusDetailStyle";
import SimpleHeader from "../components/SimpleHeader";
import Fonts from "../constants/Fonts";
import React from "react";

const OrderStatusDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <Text>OrderStatusDetail</Text>
    </SafeAreaView>
  );
};

export default OrderStatusDetail;
