import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/ProfileStyle";
import DefaultHeader from "../components/DefaultHeader";
import Fonts from "../constants/Fonts";
import BreakLine from "../components/BreakLine";
import OrderStatusCard from "../components/OrderStatusCard";
import React from "react";

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <DefaultHeader
        title={"Profile"}
        onPress={() => navigation.navigate("Notification")}
      />
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/Images/resume-pic.png")}
          style={styles.profilePic}
        />
        <View style={styles.infoContainer}>
          <Text style={[Fonts.semibold, styles.username]}>John Doe</Text>
          <Text style={[Fonts.regular, { fontSize: 14 }]}>
            unicorn.me@example.com
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text
              style={[
                Fonts.title,
                { color: "#fff", fontSize: 17, textAlign: "center" },
              ]}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BreakLine style={{ marginTop: 20 }} />
      <View style={styles.headerContainer}>
        <Text style={[Fonts.subtext, styles.header]}>Order Status</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("OrderHistory")}
          style={styles.historyWrapper}
        >
          <Text style={[Fonts.regular]}>History</Text>
          <Image
            source={require("../assets/Images/history.png")}
            style={styles.historyIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.cardWrapper}
        showsVerticalScrollIndicator={false}
      >
        <OrderStatusCard onPress={() => navigation.navigate("CancelOrder")} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
