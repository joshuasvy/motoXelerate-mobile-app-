import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fonts from "../constants/Fonts";
import DefaultHeader from "../components/DefaultHeader";
import styles from "../styles/AppointmentStyle";
import AppointmentCard from "../components/AppointmentCard";
import React from "react";

const Appointment = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <DefaultHeader
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
