import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import styles from "../styles/LandingStyle";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import OutsideHeader from "../components/OutsideHeader";
import Button from "../components/Button";

const LandingScreen = ({ navigation }) => {
    const [agreed, setAgreed] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <OutsideHeader onPress={() => navigation.navigate("Login")} />

            <View style={styles.contentWrapper}>
                <Text
                    style={[Fonts.header, { fontSize: 33, marginBottom: 10 }]}
                >
                    MOTOXELERATE
                </Text>
                <Text
                    style={[
                        Fonts.subtext,
                        { fontSize: 15, textAlign: "center" },
                    ]}
                >
                    MotoXelerate is your all-in-one motorcycle companion—shop
                    trusted parts and products, schedule repair and maintenance
                    services, and keep your ride in top condition with ease.
                </Text>
            </View>

            {/* checkbox with local image */}
            <TouchableOpacity
                style={styles.checkbox}
                activeOpacity={0.8}
                onPress={() => setAgreed(!agreed)}
            >
                <View
                    style={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#fff",
                        borderRadius: 3,
                        borderWidth: 1,
                        borderColor: "#a8a8a8ff",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "visible",
                    }}
                >
                    {agreed && (
                        <Image
                            source={require("../assets/Images/icons/check.png")}
                            style={{
                                width: 28,
                                height: 28,
                                position: "absolute",
                                top: -4,
                                left: -4,
                                resizeMode: "contain",
                            }}
                        />
                    )}
                </View>
                <Text style={[Fonts.regular, { marginLeft: 8 }]}>
                    Agree to terms and conditions
                </Text>
            </TouchableOpacity>

            <View style={styles.buttonWrapper}>
                {/* disabled buttons with condition */}
                <Button
                    title="Login"
                    width={150}
                    height={50}
                    backgroundColor={Colors.primary}
                    disabled={!agreed}
                    onPress={() => navigation.navigate("Login")}
                />

                <Button
                    title="Sign up"
                    width={150}
                    height={50}
                    backgroundColor={Colors.secondary}
                    disabled={!agreed}
                    onPress={() => navigation.navigate("Signup")}
                />
            </View>
        </SafeAreaView>
    );
};

export default LandingScreen;
