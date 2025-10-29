import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import EditProfileHeader from "../components/SimpleHeader";
import AppointmentHistoryCard from "../components/AppointmentHistoryCard";
import React, { useState, useEffect } from "react";

const AppointmentHistory = ({ navigation }) => {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      serviceName: "Brake Pad Replacement",
      date: "Oct 28, 2025",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: "2",
      serviceName: "Oil Change",
      date: "Oct 25, 2025",
      time: "2:00 PM",
      status: "Pending",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <EditProfileHeader title={"Appointment History"} />
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentHistoryCard
              serviceName={item.serviceName}
              date={item.date}
              time={item.time}
              status={item.status}
              onPress={() =>
                navigation.navigate("AppointmentDetail", {
                  appointmentId: item.id,
                })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default AppointmentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
