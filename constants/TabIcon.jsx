import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function TabIcon({ focused, routeName }) {
  const iconSource = () => {
    switch (routeName) {
      case "Home":
        return focused
          ? require("../assets/Images/navigationIcons/homeFill.png")
          : require("../assets/Images/navigationIcons/homeOutline.png");
      case "Appointment":
        return focused
          ? require("../assets/Images/navigationIcons/appointmentFill.png")
          : require("../assets/Images/navigationIcons/appointmentOutline.png");
      case "Cart":
        return focused
          ? require("../assets/Images/navigationIcons/cartFill.png")
          : require("../assets/Images/navigationIcons/cartOutline.png");
      case "Profile":
        return focused
          ? require("../assets/Images/navigationIcons/profileFill.png")
          : require("../assets/Images/navigationIcons/profileOutline.png");
    }
  };
  return (
    <Image
      source={iconSource()}
      style={[styles.icon, { opacity: focused ? 1 : 0.4 }]}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginBottom: 5,
  },
});
