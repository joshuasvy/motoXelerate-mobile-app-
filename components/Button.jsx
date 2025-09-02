import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import fonts from "../constants/Fonts";

const Button = ({ title, width, height, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width, height, backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[fonts.subtext, { color: "#fff" }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6.0,
    elevation: 4,
  },
});
