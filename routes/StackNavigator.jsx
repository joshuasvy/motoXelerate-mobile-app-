import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "../UI/LandingScreen";
import Login from "../UI/Login";
import Signup from "../UI/Signup";
import Notification from "../UI/Notification";
import ProductDetails from "../UI/ProductDetails";
import TabNavigator from "./TabNavigator";
import AppointmentDetails from "../UI/AppointmentDetails";
import EditProfile from "../UI/EditProfile";
import CancelOrder from "../UI/CancelOrder";
import History from "../UI/History";
import HistoryDetails from "../UI/HistoryDetails";
import WriteaReview from "../UI/WriteaReview";
import QuantityforCartCard from "../components/QuantityforCartCard";
import CustomModal from "../components/CustomModal";
import VariantSelection from "../components/VariantSelection";
import Testing from "../UI/Testing";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Products"
        screenOptions={{ headerShown: false, animation: "default" }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Products" component={ProductDetails} />
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="CancelOrder" component={CancelOrder} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
        <Stack.Screen name="WriteaReview" component={WriteaReview} />
        <Stack.Screen name="Quantity" component={QuantityforCartCard} />
        <Stack.Screen name="Modal" component={CustomModal} />
        <Stack.Screen name="Variant" component={VariantSelection} />
        <Stack.Screen name="Testing" component={Testing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
