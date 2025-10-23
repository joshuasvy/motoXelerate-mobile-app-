import {
  View,
  Text,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import styles from "../styles/LandingStyle";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import OutsideHeader from "../components/OutsideHeader";
import Button from "../components/Button";

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <OutsideHeader
        name="Login"
        image="https://example.com/laptop.jpg"
        onPress={() => navigation.navigate("Login")}
      />
      <View style={styles.contentWrapper}>
        <Text style={[Fonts.header, { marginBottom: 10 }]}>MOTOXELERATE</Text>
        <Text style={[Fonts.subtext, { textAlign: "center" }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      <View style={styles.checkbox}>
        <View
          style={{
            width: 17,
            height: 17,
            backgroundColor: "#fff",
            borderRadius: 3,
            borderWidth: 1,
          }}
        />
        <Text style={[Fonts.regular]}>Agree to terms and conditions</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Login"
          width={150}
          height={50}
          backgroundColor={Colors.primary}
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Sign up"
          width={150}
          height={50}
          backgroundColor={Colors.secondary}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
