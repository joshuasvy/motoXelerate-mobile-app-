import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";

export default function ProductBtn({
  backgroundColor,
  btnIcon,
  width,
  onPress,
  name,
  fontSize,
  color
}) {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.shadowWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.wrapper, { backgroundColor, width }]}
          onPress={onPress}
        >
          <Image
            source={btnIcon}
            style={styles.imageStyle}
          />
          <Text style={[fonts.subtext, { marginTop: 3, name, fontSize, color }]}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 15,
    backgroundColor: "#fff",
    mnarginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 15,
    width: 160,
    height: 50,
    borderWidth: 1,
  },
  imageStyle: {
    width: 23,
    height: 23,
    resizeMode: "contain",
  },
});
