import { StyleSheet, Text, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import EditProfileHeader from "../components/SimpleHeader";
import OrderStatusCard from "../components/OrderStatusCard";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import React from "react";

const OrderHistory = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <EditProfileHeader title={"Order History"} />
      <View style={{ marginTop: 20 }}>
        <OrderStatusCard
          userId={user._id}
          statusFilter="Completed"
          onPress={(order) =>
            navigation.navigate("OrderStatusDetail", { order })
          }
        />

        <OrderStatusCard />
      </View>
    </SafeAreaView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
