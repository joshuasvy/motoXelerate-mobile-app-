import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Fonts from "../constants/Fonts";
import React from "react";

export default function RecommendedProdCard() {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../assets/Images/resume-pic.png")}
        style={{
          width: 200,
          height: "50%",
          alignSelf: "center",
          justifyContent: "center",
        }}
      />
      <View style={{ padding: 8, marginTop: 5 }}>
        <Text style={[Fonts.regular, { fontSize: 18 }]}>Product Name</Text>
        <Text style={[Fonts.semibold, { fontSize: 17, marginTop: 10 }]}>
          $ 99.99
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
        >
          <Image
            source={require("../assets/Images/star.png")}
            style={{ width: 14, height: 14 }}
          />
          <Text
            style={[
              Fonts.minitext,
              { fontSize: 10, color: "#797979", marginLeft: 5, marginTop: 2 },
            ]}
          >
            4.9 <Text>(27 reviews)</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 180,
    height: 250,
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
