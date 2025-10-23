import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Fonts from "../constants/Fonts";
import React from "react";

export default function PaymentMethod({ nextIcon, onPress }) {
  return (
    <View style={styles.methodpaymentWrapper}>
      <Text style={[Fonts.subtext, { fontSize: 17 }]}>Method of Payment</Text>
      <View style={styles.infopaymentWrapper}>
        <Image
          source={require("../assets/Images/logo/gcash.png")}
          style={styles.gcashlogo}
        />
        <View style={styles.numNextWrapper}>
          <Text style={[Fonts.regular, { fontSize: 14 }]}>
            +63 909 2122 232
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <Image source={nextIcon} style={styles.nextBtn} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  methodpaymentWrapper: {
    marginTop: 5,
  },
  infopaymentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  gcashlogo: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginRight: 14,
  },
  numNextWrapper: {
    width: 330,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextBtn: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
