import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import { useState } from "react";
import Colors from "../constants/Colors";
import QuantityforCartCard from "./QuantityforCartCard";
import React from "react";

export default function CartCard({ onPress, name, color, size, price }) {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.shadowWrapper}>
        <View style={styles.wrapper}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <Image
              source={require("../assets/Images/testingImage.jpg")}
              style={styles.imageWrap}
            />
          </TouchableOpacity>
          <View style={styles.infoWrapper}>
            <Text style={[fonts.subtext]}>Product Name</Text>
            <Text style={[fonts.subtext, { fontSize: 16, marginTop: 10 }]}>
              Color: <Text>{color}</Text>
            </Text>
            <Text style={[fonts.subtext, { fontSize: 16 }]}>
              Size: <Text>{size}</Text>
            </Text>
            <Text style={[fonts.semibold, { fontSize: 18 }]}>$ 99.99</Text>
          </View>
          <View style={styles.quantityContainer}>
            <QuantityforCartCard />
          </View>
          <View style={styles.iconWrapper}>
            <View style={{ transform: [{ scale: 0.9 }], marginTop: -7 }}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => setChecked(!checked)}
                color={Colors.primary}
                uncheckedColor="#000"
                style={styles.checkbox}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  shadowWrapper: {
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  wrapper: {
    flexDirection: "row",
    borderRadius: 8,
    width: 358,
    height: 150,
    position: "relative",
  },
  imageWrap: {
    width: 145,
    height: 150,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infoWrapper: {
    width: 210,
    paddingLeft: 15,
    justifyContent: "center",
  },
  quantityContainer: {
    position: "absolute",
    right: 10,
    bottom: 8,
  },
  iconWrapper: {
    position: "absolute",
    right: 0,
    top: 5,
  },
  checkbox: {
    width: 23,
    height: 23,
  },
  nextIcon: {
    width: 28,
    height: 28,
  },
});
