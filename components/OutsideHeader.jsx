import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const OutsideHeader = ({ name, onPress }) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image
                    source={require("../assets/Images/logo/motoxelerate.png")}
                    style={styles.logo}
                />

                <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                    <Text
                        style={[
                            Fonts.title,
                            { marginRight: 30, marginTop: 25 },
                        ]}
                    >
                        {name}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.designWrapper}>
                <View
                    style={{
                        backgroundColor: Colors.primary,
                        width: 135,
                        height: 38,
                        marginBottom: 10,
                    }}
                />
                <View
                    style={{
                        backgroundColor: Colors.secondary,
                        width: 95,
                        height: 38,
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default OutsideHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
    },
    logo: {
        height: 140,
        width: 140,
        borderWidth: 1.5,
        resizeMode: "cover",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    designWrapper: {
        alignItems: "flex-end",
    },
});
