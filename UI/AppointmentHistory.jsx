import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import EditProfileHeader from "../components/SimpleHeader";
import AppointmentHistoryCard from "../components/AppointmentHistoryCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppointmentHistory = ({ navigation }) => {
    const [appointments, setAppointments] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // ✅ refresh state

    const fetchAppointments = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(
                "https://api-motoxelerate.onrender.com/api/appointment/user",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("📦 Appointments fetched:", res.data);

            const mapped = res.data.map((item) => ({
                id: item._id,
                service_Type: item.service_Type,
                date: item.date,
                time: item.time,
                status: item.status || "Pending",
            }));

            setAppointments(mapped);
        } catch (err) {
            console.error("❌ Fetch error:", err.message);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // ✅ Pull-to-refresh handler
    const onRefresh = async () => {
        console.log("🔄 Refresh triggered");
        setRefreshing(true);
        try {
            await fetchAppointments();
        } catch (err) {
            console.error("❌ Error refreshing:", err.message);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <EditProfileHeader title={"Appointment History"} />
            <View style={{ marginVertical: 13, marginBottom: 80 }}>
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <AppointmentHistoryCard
                            service_Type={item.service_Type}
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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
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
