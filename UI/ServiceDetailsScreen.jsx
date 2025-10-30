import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DefaultHeader from "../components/DefaultHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import services from "../data/services";
import axios from "axios";

const ServiceDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const name = route?.params?.name ?? "";
  const decodedName = decodeURIComponent(name);
  const service = services.find((s) => s.service === decodedName);
  const { user } = useContext(AuthContext); // or from Redux, etc.
  const userId = user?._id;

  if (!service) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Service not found.</Text>
      </View>
    );
  }

  const [formData, setFormData] = useState({
    time: "",
    date: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const chosen = new Date(selectedDate);
      chosen.setHours(0, 0, 0, 0);

      const diffInMs = chosen - today;
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays < 1) {
        Alert.alert("Invalid Date", "You must book at least 1 day in advance.");
        return;
      }

      if (diffInDays > 14) {
        Alert.alert("Invalid Date", "You can only book up to 2 weeks ahead.");
        return;
      }

      const year = chosen.getFullYear();
      const month = (chosen.getMonth() + 1).toString().padStart(2, "0");
      const day = chosen.getDate().toString().padStart(2, "0");
      const formatted = `${year}-${month}-${day}`;

      handleChange("date", formatted);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      let hour = selectedTime.getHours();
      const minute = selectedTime.getMinutes().toString().padStart(2, "0");
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12; // Convert to 12-hour format
      const formattedTime = `${hour}:${minute} ${ampm}`;
      handleChange("time", formattedTime);
    }
  };

  const handleBooking = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("🔐 Token from storage:", token);

      if (!formData.date || !formData.time) {
        Alert.alert("Missing Info", "Please select both date and time.");
        return;
      }

      const payload = {
        userId,
        date: formData.date,
        time: formData.time,
        service_Type: service.service,
        service_Charge: service.price,
      };
      console.log("📤 Booking payload:", payload);

      const response = await axios.post(
        "https://api-motoxelerate.onrender.com/api/appointment",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("✅ Success", response.data.message);
      navigation.goBack();
    } catch (error) {
      console.error("❌ Booking error:", error.response?.data || error.message);
      Alert.alert(
        "❌ Error",
        error.response?.data?.message || "Booking failed"
      );
    }
  };

  const downpayment = Math.round(service.price * 0.5);

  return (
    <ScrollView style={styles.container}>
      <DefaultHeader
        title={"Appointment"}
        onPress={() => navigation.navigate("Notification")}
      />
      <View style={styles.content}>
        <Text style={styles.heading}>Book an Appointment</Text>

        <Text style={styles.serviceTitle}>{service.service}</Text>
        <Text style={styles.description}>{service.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.subheading}>Included Services</Text>
        {service.importance && (
          <Text style={styles.includedItem}>{service.importance}</Text>
        )}

        <View style={styles.divider} />

        <View style={styles.formRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Time</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowTimePicker(true)}
            >
              <Text>{formData.time || "Select time"}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={new Date()}
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{formData.date || "Select date"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={new Date()}
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()} // ✅ restrict to today or future
              />
            )}
          </View>
        </View>

        <View style={styles.footerRow}>
          <View>
            <Text style={styles.price}>Original Price: ₱{service.price}</Text>
            <Text style={styles.downpayment}>
              Downpayment (50%): ₱{downpayment}
            </Text>
            <Text style={styles.tooltip}>
              This amount is required to confirm your appointment
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ServiceDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  content: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    elevation: 3,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  serviceTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 16, color: "#555" },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  includedItem: { fontSize: 16, marginLeft: 8, marginBottom: 4 },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  inputGroup: { flex: 1 },
  label: { fontSize: 14, color: "#333", marginBottom: 4 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  price: { fontSize: 16, color: "#555" },
  downpayment: { fontSize: 18, fontWeight: "bold", color: "#e53935" },
  tooltip: { fontSize: 12, color: "#888", marginTop: 4 },
  button: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { fontSize: 18, color: "#e53935" },
});
