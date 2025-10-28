import { View, Text, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/SignupStyle";
import fonts from "../constants/Fonts";
import colors from "../constants/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import OutsideHeader from "../components/OutsideHeader";

const API_URL = "https://api-motoxelerate.onrender.com/api/user/register";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const signup = async (name, contact, email, password) => {
    const payload = {
      name,
      contact: Number(contact),
      email,
      password,
    };
    console.log("📤 Sending to API:", payload);
    const response = await axios.post(API_URL, payload);
    return response.data;
  };

  const handleSignup = async () => {
    try {
      const res = await signup(name, contact, email, password);
      console.log(res); // ✅ see what backend returns
      Alert.alert("Success", "Account created!");
      navigation.navigate("Login");
    } catch (err) {
      console.log(err.response?.data); // ✅ show real error in console
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong";
      Alert.alert("Error", errorMsg);
    }
  };

  if (isNaN(contact)) {
    return Alert.alert("Error", "Contact must be a number.");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <OutsideHeader
        name={"Login"}
        onPress={() => navigation.navigate("Login")}
      />
      <View style={styles.wrapper}>
        <Text style={[fonts.header, { marginBottom: 20 }]}>Sign up</Text>
        <Input
          label={"Name:"}
          placeholder={"Enter your name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          marginTop={10}
          label={"Contact:"}
          placeholder={"Enter your contact"}
          value={contact}
          onChangeText={setContact}
        />
        <Input
          marginTop={10}
          label={"Email:"}
          placeholder={"Enter your email"}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          marginTop={10}
          label={"Password:"}
          placeholder={"Enter your email"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Input
          marginTop={10}
          label={"Password:"}
          placeholder={"Enter your email"}
          value={rePassword}
          onChangeText={setRePassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          style={styles.button}
          title="Sign up"
          width={120}
          height={50}
          backgroundColor={colors.primary}
          onPress={handleSignup}
        />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
