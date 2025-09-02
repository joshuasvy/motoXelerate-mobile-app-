import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Fonts from "../constants/Fonts";
import Header from "../components/Header";
import styles from "../styles/AppointmentStyle";
import AppointmentCard from "../components/AppointmentCard";

const Appointment = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <Header
        title={"Appointment"}
        onPress={() => navigation.navigate("Notification")}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.historyBtnWrapper}
        onPress={() => console.log("History Clicked")}
      >
        <Image
          source={require("../assets/Images/history.png")}
          style={styles.historyImage}
        />
        <Text style={[Fonts.subtext]}>History</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.cardWrapper}
        showsVerticalScrollIndicator={false}
      >
        <AppointmentCard
          banner={require("../assets/Images/banners/testBanner1.jpg")}
          title={"Service Name"}
          onPress={() => navigation.navigate("AppointmentDetails")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appointment;
