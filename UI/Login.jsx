import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { useState } from "react";
import styles from "../styles/LoginStyle";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import OutsideHeader from "../components/OutsideHeader";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <OutsideHeader
        name={"Sign up"}
        onPress={() => navigation.navigate("Signup")}
      />
      <View style={styles.wrapper}>
        <Text style={[Fonts.header, { marginBottom: 20 }]}>Login</Text>
        <Input
          label={"Email:"}
          placeholder={"Enter your email"}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          marginTop={18}
          label={"Password:"}
          placeholder={"Enter your email"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={styles.checkboxWrapper}>
          <View style={styles.checkbox}>
            <View
              style={{
                width: 13,
                height: 13,
                backgroundColor: "#fff",
                borderRadius: 3,
                borderWidth: 1,
              }}
            />
            <Text style={[Fonts.regular, { fontSize: 14 }]}>Remember me</Text>
          </View>
          <Text
            style={[Fonts.regular, { fontSize: 14, color: Colors.secondary }]}
          >
            Forgot Password
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            title="Login"
            width={120}
            height={50}
            backgroundColor={Colors.primary}
            onPress={() => navigation.navigate("Tab")}
          />
        </View>
      </View>
      <View style={styles.footerWrapper}>
        <Text
          style={[
            Fonts.regular,
            { textAlign: "center", padding: 40, fontSize: 17 },
          ]}
        >
          By continuing, you agree to our{" "}
          <Text style={{ fontWeight: "bold" }}>Terms and Conditions</Text> and
          have read our{" "}
          <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
