import { View, Text, StatusBar, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/NotificationStyle";
import Header from "../components/DefaultHeader";
import Fonts from "../constants/Fonts";
import BreakLine from "../components/BreakLine";
import React from "react";

const Notification = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />

            <Header
                backIcon={require("../assets/Images/icons/back.png")}
                goBack={() => navigation.goBack()}
                back={"Back"}
                title={"Notification"}
            />
            <ScrollView
                style={styles.cardContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.notifWrapper}>
                    <Image
                        source={require("../assets/Images/testingImage.jpg")}
                        style={styles.productImage}
                    />
                    <View style={styles.infoWrapper}>
                        <Text
                            style={[
                                Fonts.semibold,
                                { fontSize: 16, marginTop: 10 },
                            ]}
                        >
                            Your notification here
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                width: "80%",
                            }}
                        >
                            <Text
                                style={[
                                    Fonts.regular,
                                    {
                                        fontSize: 12,
                                        marginTop: 8,
                                        flexShrink: 1,
                                    },
                                ]}
                            >
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                            </Text>
                        </View>
                    </View>
                </View>
                <BreakLine />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Notification;
