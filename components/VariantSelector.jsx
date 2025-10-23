import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import React, { useState } from "react";

export default function VariantSelector() {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <View>
        <Text style={[Fonts.subtext, { fontSize: 17, marginBottom: 5 }]}>
          Length
        </Text>
        <View>
          <TouchableOpacity
            style={[
              styles.specs1,
              {
                backgroundColor: selected ? Colors.primary : "#fff",
              },
            ]}
            onPressIn={() => setSelected(true)}
          >
            <Text
              style={[
                Fonts.regular,
                { fontSize: 14, textAlign: "center", alignSelf: "center" },
              ]}
            >
              280 mm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text>Mounting Type</Text>
        <TouchableOpacity style={styles.specs2}>
          <Text>Eye-to-eye</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  specs1: {
    borderWidth: 1,
    backgroundColor: "#fff",
    marginLeft: 7,
    borderRadius: 8,
    padding: 5,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
});
