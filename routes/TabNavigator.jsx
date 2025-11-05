import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import HomeScreen from "../UI/HomeScreen";
import Appointment from "../UI/Appointment";
import Cart from "../UI/Cart";
import Profile from "../UI/Profile";
import TabIcon from "../constants/TabIcon";
import TabName from "../constants/TabName";
import Colors from "../constants/Colors";
import { View, Text } from "react-native";
import React from "react";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} routeName={route.name} />
                    ),
                    tabBarButton: (props) => (
                        <PlatformPressable
                            {...props}
                            android_ripple={{ color: Colors.background }}
                            pressOpacity={0}
                        />
                    ),
                    headerShown: false,
                    tabBarStyle: {
                        height: 70,
                        backgroundColor: "#fff",
                        borderTopRightRadius: 35,
                        borderTopLeftRadius: 40,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        paddingTop: 10,
                    },
                    tabBarActiveBackgroundColor: "#fff",
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <TabName name="Home" focused={focused} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Appointment"
                    component={Appointment}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <TabName name="Appointment" focused={focused} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <TabName name="Cart" focused={focused} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <TabName name="Profile" focused={focused} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}
