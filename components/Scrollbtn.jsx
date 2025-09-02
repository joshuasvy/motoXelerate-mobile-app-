import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Scrollbtn = ({ label, marginRight, imageBtn }) => {
  return (
    <View style={[styles.contentWrapper, { marginRight }]}>
      <Text style={[fonts.regular, { color: "#fff" }]}>{label}</Text>
      <TouchableOpacity>
        <Image
          source={imageBtn}
          style={{ width: 23, height: 23, marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Scrollbtn;

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
    marginRight: 7,
  },
});
