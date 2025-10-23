import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import React from "react";

export default function AddressWrapper({ nextIcon}) {
  return (
    <View style={styles.addressWrapper}>
      <Text style={[Fonts.semibold, { fontSize: 19, marginTop: 5 }]}>
        Address
      </Text>
      <Text style={[Fonts.regular, { fontSize: 13 }]}>
        Blk 13 Lot 82 Phase 3F Lorem ipsum Consectetur adipiscing
      </Text>
      <Image
        source={nextIcon}
        style={styles.nextBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addressWrapper: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "relative",
  },
  nextBtn: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    position: "absolute",
    right: 10,
    bottom: 10,
    padding: 10,
  },
});
