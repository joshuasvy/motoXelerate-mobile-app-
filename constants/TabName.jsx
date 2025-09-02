import { Text, View } from "react-native";
import React from "react";
import Fonts from "./Fonts";

export default function TabName({ name, focused }) {
  return (
    <View>
      <Text
        style={[Fonts.tabs, { color: focused ? "#040200ff" : "#b4b3b3ff" }]}
      >
        {name}
      </Text>
    </View>
  );
}
