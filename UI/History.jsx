import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/HistoryStyle";
import Header from "../components/Header";
import HistoryCard from "../components/HistoryCard";
import Fonts from "../constants/Fonts";
import React from "react";

const History = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <Header
        title={"Order History"}
        onPress={() => navigation.navigate("Notification")}
        backIcon={require("../assets/Images/back.png")}
        back={"Back"}
        goBack={() => navigation.goBack()}
      />
      <View style={{ marginTop: 15, marginBottom: 10 }}>
        <HistoryCard onPress={() => navigation.navigate("HistoryDetails")} />
        <HistoryCard />
        <HistoryCard />
      </View>
    </ScrollView>
  );
};

export default History;
