import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import React from "react";

export default function FilloutForm({
  title,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  nextIcon,
  onPress,
}) {
  return (
    <>
      <View style={styles.formWrapper}>
        <Text style={[Fonts.subtext]}>{title}</Text>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          numberOfLines={1}
          style={[Fonts.regular, styles.input]}
        />
      </View>
      <View
        style={{
          borderWidth: 1,
          height: 0.2,
          borderRadius: 1,
          marginHorizontal: 15,
          marginTop: -8,
          backgroundColor: Colors.test,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 8,
  },
  input: {
    width: 150,
    backgroundColor: "transparent",
    overflow: "hidden",
    textAlign: "left",
  },
});
