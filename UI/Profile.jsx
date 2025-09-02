import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../styles/ProfileStyle";
import Header from "../components/Header";
import Fonts from "../constants/Fonts";
import BreakLine from "../components/BreakLine";
import OrderHistoryCard from "../components/OrderHistoryCard";
import React from "react";

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <Header
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
          onPress={() => console.log("History Clicked")}
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
        <OrderHistoryCard onPress={() => navigation.navigate("CancelOrder")} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
