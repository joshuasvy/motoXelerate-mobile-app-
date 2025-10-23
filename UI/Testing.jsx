import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import styles from "../styles/SignupStyle";
import fonts from "../constants/Fonts";
import colors from "../constants/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import OutsideHeader from "../components/OutsideHeader";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

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
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
