import StackNavigator from "./routes/StackNavigator";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import * as Updates from "expo-updates";

export default function App() {
    const [fontsLoaded] = useFonts({
        Regular: require("./assets/fonts/Poppins-Regular.ttf"),
        Medium: require("./assets/fonts/Poppins-Medium.ttf"),
        SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
        Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    });

    useEffect(() => {
        const checkUpdate = async () => {
            try {
                const update = await Updates.checkForUpdateAsync();
                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                }
            } catch (error) {
                console.log("Update check failed:", error);
            }
        };

        checkUpdate();
    }, []);

    if (!fontsLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return <StackNavigator />;
}
