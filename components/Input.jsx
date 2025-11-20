import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Fonts from "../constants/Fonts";

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    marginTop,
    leftIcon,
    keyboardType = "default",
    inputMode,
    returnKeyType = "done",
    blurOnSubmit = true,
    onSubmitEditing,
    inputRef,
    error,
    validationRules = [], // 👈 array of rules
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
    const [isFocused, setIsFocused] = useState(false); // 👈 track focus state

    return (
        <View style={{ marginBottom: 15 }}>
            {label && (
                <Text style={[Fonts.regular, { marginTop, fontSize: 17 }]}>
                    {label}
                </Text>
            )}
            <View
                style={[
                    styles.inputContainer,
                    error ? styles.inputError : styles.inputNormal,
                ]}
            >
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={
                        secureTextEntry ? isPasswordVisible : false
                    }
                    keyboardType={keyboardType}
                    inputMode={inputMode}
                    returnKeyType={returnKeyType}
                    blurOnSubmit={blurOnSubmit}
                    onSubmitEditing={onSubmitEditing}
                    onFocus={() => setIsFocused(true)} // 👈 show rules when focused
                    onBlur={() => setIsFocused(false)} // 👈 hide rules when blurred
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <MaterialIcons
                            name={
                                isPasswordVisible
                                    ? "visibility-off"
                                    : "visibility"
                            }
                            size={24}
                            color="#aaa"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Show rules only when focused */}
            {isFocused && validationRules.length > 0 && (
                <View style={{ marginTop: 5, marginLeft: 10 }}>
                    {validationRules.map((rule, index) => {
                        const isValid = rule.test(value);
                        return (
                            <Text
                                key={index}
                                style={{
                                    fontSize: 12,
                                    color: isValid ? "green" : "red",
                                    marginTop: 2,
                                }}
                            >
                                <MaterialIcons
                                    name={isValid ? "check-circle" : "cancel"}
                                    size={14}
                                    color={isValid ? "green" : "red"}
                                />{" "}
                                {rule.label}
                            </Text>
                        );
                    })}
                </View>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    leftIcon: {
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffffff",
        borderRadius: 10,
        shadowColor: "#000000ff",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6.0,
        elevation: 2,
    },
    inputNormal: {
        borderColor: "#e7e4e4ff",
    },
    inputError: {
        borderWidth: 1,
        borderColor: "#ff0000ff",
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 15,
        backgroundColor: "transparent",
    },
    icon: {
        marginRight: 8,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 7,
    },
});

export default Input;
