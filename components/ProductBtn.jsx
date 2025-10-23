import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import React from "react";

export default function ProductBtn({
  backgroundColor,
  btnIcon,
  width,
  onPress,
  name,
  fontSize,
  color,
}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between", marginBottom: 10, }}>
      <View style={styles.shadowWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.wrapper, { backgroundColor, width }]}
          onPress={onPress}
        >
          <Image source={btnIcon} style={styles.imageStyle} />
          <Text
            style={[Fonts.subtext, { marginTop: 3, name, fontSize, color }]}
          >
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 15,
    backgroundColor: Colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  wrapper: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingLeft: 30,
    borderRadius: 15,
    width: 160,
    height: 50,
  },
  imageStyle: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
