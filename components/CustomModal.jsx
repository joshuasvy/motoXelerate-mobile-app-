import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal as RNModal,
    TouchableOpacity,
} from "react-native";
import Fonts from "../constants/Fonts";
import React, { useState } from "react";

export default function CustomModal({
    visibility,
    onPress,
    iconModal,
    textModal,
}) {
    return (
        <RNModal visible={visibility} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.shadowWrapper}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                            <Image
                                source={require("../assets/Images/icons/close.png")}
                                style={styles.modalClose}
                            />
                        </TouchableOpacity>
                        <Image source={iconModal} style={styles.modalIcon} />
                        <Text
                            style={[
                                Fonts.semibold,
                                {
                                    fontSize: 18,
                                    marginTop: 25,
                                    alignSelf: "center",
                                },
                            ]}
                        >
                            {textModal}
                        </Text>
                    </View>
                </View>
            </View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.05)",
        justifyContent: "center",
        alignItems: "center",
    },
    shadowWrapper: {
        width: "79%",
        height: "33%",
        borderRadius: 20,
        backgroundColor: "#fff",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
    },
    modalClose: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        alignSelf: "flex-end",
    },
    modalIcon: {
        width: 130,
        height: 130,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 18,
    },
});
