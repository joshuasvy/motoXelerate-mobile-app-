import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/EditProfileStyle";
import Header from "../components/Header";
import FilloutForm from "../components/FilloutForm";
import React from "react";

const EditProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <Header
        backIcon={require("../assets/Images/back.png")}
        back={"Back"}
        title={"My Account"}
        goBack={() => navigation.goBack()}
        notifPress={() => navigation.navigate("Notification")}
      />
      <FilloutForm />
      <Text>EditProfile</Text>
    </SafeAreaView>
  );
};

export default EditProfile;
