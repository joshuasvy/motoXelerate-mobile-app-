import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import React from "react";

export default function FilloutForm({
    title,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
}) {
    return (
        <>
            <View style={styles.formWrapper}>
                <Text style={[Fonts.subtext, { fontSize: 16 }]}>{title}</Text>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    numberOfLines={1}
                    style={[Fonts.regular, styles.input]}
                />
            </View>
            <View
                style={{
                    borderWidth: 0.5,
                    borderColor: Colors.test,
                    borderRadius: 1,
                    marginHorizontal: 15,
                    marginTop: 1,
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    formWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 8,
    },
    input: {
        width: 160,
        backgroundColor: "transparent",
        overflow: "hidden",
        // textAlign: "left",
        borderWidth: 1,
    },
});
