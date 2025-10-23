import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "../components/SimpleHeader";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

const ChangePassword = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");

  return (
    <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      
      <SimpleHeader
        goBack={() => navigation.goBack()}
        saveTxt={"Save"}
        saveBtn={() => navigation.goBack()}
      />
      <View style={styles.inputWrapper}>
        <Text style={[Fonts.regular]}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder={"Enter new password"}
            secureTextEntry={!isPasswordVisible}
          />

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
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={[Fonts.regular, { fontSize: 14 }]}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={repass}
            onChangeText={setRepass}
            placeholder={"Confirm password"}
            secureTextEntry={!isPasswordVisible}
          />

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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  inputContainer: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    borderRadius: 10,
    paddingHorizontal: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6.0,
    elevation: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    backgroundColor: "transparent",
  },
  icon: {
    marginLeft: 10,
  },
});
