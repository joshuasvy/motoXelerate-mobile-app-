import {
    View,
    Text,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import axios from "axios";
import styles from "../styles/SignupStyle";
import fonts from "../constants/Fonts";
import colors from "../constants/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import OutsideHeader from "../components/OutsideHeader";
import {
    validateSignUp,
    validateField,
    passwordRules,
    confirmPasswordRules,
    formatContactNumber,
} from "../utils/validation";

const API_URL = "https://api-motoxelerate.onrender.com/api/user/register";

const Signup = ({ navigation }) => {
    const [fname, setfName] = useState("");
    const [lname, setlName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({});

    // refs dictionary for easier focus
    const inputRefs = {
        fname: useRef(null),
        lname: useRef(null),
        address: useRef(null),
        contact: useRef(null),
        email: useRef(null),
        password: useRef(null),
        rePassword: useRef(null),
    };

    const prevContactRef = useRef("");

    const handleSignup = async () => {
        console.log("🚀 handleSignup triggered");

        const newErrors = validateSignUp(
            fname,
            lname,
            address,
            contact,
            email,
            password,
            rePassword
        );
        console.log("📝 Validation result:", newErrors);

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstErrorKey = Object.keys(newErrors)[0];
            inputRefs[firstErrorKey]?.current?.focus();
            return; // stop here if errors exist
        }

        // ✅ If no errors, proceed with API call
        const payload = {
            firstName: fname,
            lastName: lname,
            address,
            contact: formatContactNumber(contact),
            email,
            password,
        };

        try {
            console.log("📤 Sending payload:", payload);

            const response = await axios.post(API_URL, payload);

            console.log("✅ API response:", response.data);

            Alert.alert("Success", "Account created!");
            navigation.navigate("Login");
        } catch (err) {
            console.error("❌ Signup error:", err);

            const errorMsg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err.message ||
                "Something went wrong";

            Alert.alert("Error", errorMsg);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={60}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            style={styles.container}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "center",
                                paddingBottom: Platform.OS === "ios" ? 0 : 20,
                            }}
                        >
                            <OutsideHeader
                                name={"Login"}
                                onPress={() => navigation.navigate("Login")}
                            />
                            <View style={styles.wrapper}>
                                <Text
                                    style={[fonts.header, { marginBottom: 20 }]}
                                >
                                    Sign up
                                </Text>

                                <Input
                                    label="First Name:"
                                    placeholder="Enter your first name"
                                    value={fname}
                                    onChangeText={(text) => {
                                        setfName(text);
                                        setErrors((prev) => ({
                                            ...prev,
                                            fname: validateField(
                                                "fname",
                                                text,
                                                { password }
                                            ),
                                        }));
                                    }}
                                    inputRef={inputRefs.fname}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        inputRefs.lname.current?.focus()
                                    }
                                    error={errors.fname}
                                />

                                <Input
                                    label="Last Name:"
                                    placeholder="Enter your last name"
                                    value={lname}
                                    onChangeText={(text) => {
                                        setlName(text);
                                        setErrors((prev) => ({
                                            ...prev,
                                            lname: validateField(
                                                "lname",
                                                text,
                                                { password }
                                            ),
                                        }));
                                    }}
                                    inputRef={inputRefs.lname}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        inputRefs.address.current?.focus()
                                    }
                                    error={errors.lname}
                                />

                                <Input
                                    label="Address:"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChangeText={(text) => {
                                        setAddress(text);
                                        setErrors((prev) => ({
                                            ...prev,
                                            address: validateField(
                                                "address",
                                                text,
                                                { password }
                                            ),
                                        }));
                                    }}
                                    inputRef={inputRefs.address}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        inputRefs.contact.current?.focus()
                                    }
                                    error={errors.address}
                                />

                                <Input
                                    label="Contact:"
                                    placeholder="+63"
                                    value={contact}
                                    onChangeText={(t) => {
                                        const prev = prevContactRef.current;
                                        const isDeleting =
                                            t.length < prev.length;
                                        const formatted = isDeleting
                                            ? t
                                            : formatContactNumber(t);
                                        setContact(formatted);
                                        prevContactRef.current = t;

                                        setErrors((prev) => ({
                                            ...prev,
                                            contact: validateField(
                                                "contact",
                                                formatted,
                                                { password }
                                            ),
                                        }));
                                    }}
                                    inputRef={inputRefs.contact}
                                    keyboardType="number-pad"
                                    inputMode="numeric"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        inputRefs.email.current?.focus()
                                    }
                                    error={errors.contact}
                                    leftIcon={
                                        <Image
                                            source={require("../assets/Images/icons/flag.png")}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                marginLeft: 10,
                                            }}
                                            resizeMode="contain"
                                        />
                                    }
                                />

                                <Input
                                    label="Email:"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        setErrors((prev) => ({
                                            ...prev,
                                            email: validateField(
                                                "email",
                                                text,
                                                { password }
                                            ),
                                        }));
                                    }}
                                    inputRef={inputRefs.email}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        inputRefs.password.current?.focus()
                                    }
                                    error={errors.email}
                                />

                                <Input
                                    label="Password:"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        setErrors((prev) => ({
                                            ...prev,
                                            password: validateField(
                                                "password",
                                                text,
                                                { password }
                                            ),
                                        }));
                                    }}
                                    secureTextEntry={true}
                                    inputRef={inputRefs.password}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        inputRefs.rePassword.current?.focus()
                                    }
                                    error={errors.password}
                                    validationRules={passwordRules}
                                />

                                <Input
                                    label="Confirm Password:"
                                    placeholder="Confirm your password"
                                    value={rePassword}
                                    onChangeText={(text) => {
                                        setRePassword(text);
                                        setErrors((prev) => ({
                                            ...prev,
                                            rePassword: validateField(
                                                "rePassword",
                                                text,
                                                { password }
                                            ),
                                        }));
                                    }}
                                    secureTextEntry={true}
                                    inputRef={inputRefs.rePassword}
                                    returnKeyType="done"
                                    error={errors.rePassword}
                                    validationRules={confirmPasswordRules(
                                        password,
                                        rePassword
                                    )}
                                />
                            </View>

                            <View style={styles.buttonWrapper}>
                                <Button
                                    style={styles.button}
                                    title="Sign up"
                                    width={120}
                                    height={50}
                                    backgroundColor={colors.primary}
                                    onPress={handleSignup}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Signup;
