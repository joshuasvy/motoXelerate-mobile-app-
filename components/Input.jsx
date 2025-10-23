import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Fonts from "../constants/Fonts";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  marginTop,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  return (
    <View>
      <Text style={[Fonts.regular, { marginTop, fontSize: 17 }]}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ? isPasswordVisible : false}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <MaterialIcons
              name={isPasswordVisible ? "visibility-off" : "visibility"}
              size={24}
              color="#aaa"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6.0,
    elevation: 5, 
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    backgroundColor: "transparent",
  },
  icon: {
    marginLeft: 10,
  },
});

export default Input;
