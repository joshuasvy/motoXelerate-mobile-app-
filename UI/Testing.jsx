import { View, Text, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import styles from "../styles/SignupStyle";
import fonts from "../constants/Fonts";
import colors from "../constants/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import OutsideHeader from "../components/OutsideHeader";
import { supabase } from "../lib/supabase"; // make sure this path is correct
import bcrypt from "bcryptjs"; // optional if you're hashing manually

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const addUser = async () => {
    try {
      console.log("Sign up button pressed");

      if (!name || !contact || !email || !password || !rePassword) {
        Alert.alert("Error", "Please fill out all fields.");
        return;
      }

      if (password !== rePassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      const hashPassword = async (plainPassword) => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(plainPassword, salt);
        return hashed;
      };

      const hashedPassword = await hashPassword(password);

      const { data, error } = await supabase
        .from("users") // updated table name
        .insert([
          {
            name,
            contact,
            email,
            password: hashedPassword,
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        Alert.alert("Signup Failed", error.message);
      } else {
        console.log("User added:", data);
        Alert.alert("Success", "Account created!");
        navigation.navigate("Login");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  bcrypt.setRandomFallback((len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(Math.floor(Math.random() * 256));
    }
    return result;
  });

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
          onChangeText={setName}
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
          onPress={addUser}
        />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
