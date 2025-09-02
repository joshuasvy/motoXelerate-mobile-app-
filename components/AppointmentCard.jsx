import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Fonts from "../constants/Fonts";

export default function AppointmentCard({ banner, title, onPress }) {
  return (
    <View style={styles.cardContainer}>
      <Image source={banner} style={styles.banner} />
      <View style={styles.action}>
        <Text style={[Fonts.semibold, styles.title]}>{title}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <Image
            source={require("../assets/Images/next.png")}
            style={styles.nextIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1.2,
    borderColor: "#949494",
    height: 250,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 10,
  },
  banner: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
    height: 190,
    width: 361,
  },
  action: {
    flexDirection: "row",
    marginTop: 13,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
  nextIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
