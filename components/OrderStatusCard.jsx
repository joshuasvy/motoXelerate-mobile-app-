import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import { useState } from "react";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import React from "react";

export default function OrderStatusCard({
  name,
  color,
  size,
  price,
  onPress,
}) {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.shadowWrapper}>
        <View style={styles.wrapper}>
          <Image
            source={require("../assets/Images/testingImage.jpg")}
            style={styles.imageWrap}
          />
          <View style={styles.infoWrapper}>
            <Text style={[Fonts.subtext]}>Product Name</Text>
            <Text style={[Fonts.subtext, { fontSize: 16, marginTop: 13 }]}>
              Color: <Text>{color}</Text>
            </Text>
            <Text style={[Fonts.subtext, { fontSize: 16 }]}>
              Size: <Text>{size}</Text>
            </Text>

            <View style={styles.priceStatusWrapper}>
              <Text style={[Fonts.semibold, { fontSize: 18, marginTop: 5 }]}>
                $ 99.99
              </Text>
              <View style={styles.statusWrapper}>
                <Text style={[Fonts.regular, { fontSize: 14 }]}>
                  Status Here
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                <Image
                  source={require("../assets/Images/next.png")}
                  style={styles.nextIcon}
                />
              </TouchableOpacity>
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
    width: 373,
    height: 168,
    position: "relative",
  },
  imageWrap: {
    width: 145,
    height: 159,
    margin: 3,
    resizeMode: "cover",
    borderRadius: 8,
  },
  infoWrapper: {
    marginLeft: 8,
    justifyContent: "center",
  },
  priceStatusWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 13,
  },
  statusWrapper: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    backgroundColor: Colors.primary,
    borderRadius: 15,
  },
  nextIcon: {
    width: 26,
    height: 26,
  },
});
