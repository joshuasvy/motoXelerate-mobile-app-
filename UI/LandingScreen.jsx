import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "../styles/LandingStyle";
import fonts from "../constants/Fonts";
import colors from "../constants/Colors";
import HeaderPage from "../components/HeaderPage";
import Button from "../components/Button";

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <HeaderPage
        name="Login"
        image="https://example.com/laptop.jpg"
        onPress={() => navigation.navigate("Login")}
      />
      <View style={styles.contentWrapper}>
        <Text style={[fonts.header, { marginBottom: 10 }]}>MOTOXELERATE</Text>
        <Text style={[fonts.subtext, { textAlign: "center" }]}>
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
        <Text style={[fonts.regular]}>Agree to terms and conditions</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Login"
          width={150}
          height={50}
          backgroundColor={colors.primary}
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Sign up"
          width={150}
          height={50}
          backgroundColor={colors.secondary}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
