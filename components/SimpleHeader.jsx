import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import React from "react";

export default function SimpleHeader({ goBack, title, saveBtn, saveTxt }) {
  return (
    <View style={styles.container}>
      <Text style={[Fonts.header, styles.title]}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={goBack}
        style={styles.backWrapper}
      >
        <Image
          source={require("../assets/Images/back.png")}
          style={styles.backIcon}
        />
        <Text style={[Fonts.regular, { fontSize: 18, marginTop: 3 }]}>
          Back
        </Text>
      </TouchableOpacity>
      <View style={styles.saveBtn}>
        <TouchableOpacity activeOpacity={0.8} onPress={saveBtn}>
          <Text style={[Fonts.subtext]}>{saveTxt}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    position: "relative",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  backWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  saveBtn: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
  },
});
