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

const API_URL = "https://api-motoxelerate.onrender.com/api/user/register";

const Signup = ({ navigation }) => {
    const [fname, setfName] = useState("");
    const [lname, setlName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const lnameRef = useRef(null);
    const addressRef = useRef(null);
    const contactRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const rePasswordRef = useRef(null);
    const prevContactRef = useRef("");

    const formatContactNumber = (input) => {
        let digits = input.replace(/\D/g, "").replace(/^0/, "");
        if (digits.startsWith("63")) digits = digits.slice(2);
        const prefix = "+63";

        if (digits.length === 0) return prefix;
        if (digits.length <= 3) return `${prefix} ${digits}`;
        if (digits.length <= 6)
            return `${prefix} ${digits.slice(0, 3)} ${digits.slice(3)}`;
        return `${prefix} ${digits.slice(0, 3)} ${digits.slice(
            3,
            6
        )} ${digits.slice(6, 11)}`;
    };

    const handleSignup = async () => {
        if (
            !fname ||
            !lname ||
            !address ||
            !contact ||
            !email ||
            !password ||
            !rePassword
        ) {
            return Alert.alert("Error", "All fields are required.");
        }

        if (password !== rePassword) {
            return Alert.alert("Error", "Passwords do not match.");
        }

        const payload = {
            firstName: fname,
            lastName: lname,
            address,
            contact: contact, // formatted version
            email,
            password,
        };

        try {
            console.log("📤 Sending to API:", payload);
            const response = await axios.post(API_URL, payload);
            console.log("✅ Response:", response.data);
            Alert.alert("Success", "Account created!");
            navigation.navigate("Login");
        } catch (err) {
            console.log("❌ Error:", err.response?.data);
            const errorMsg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Something went wrong";
            Alert.alert("Error", errorMsg);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
                                    marginTop={10}
                                    label={"First Name:"}
                                    placeholder={"Enter your first name"}
                                    value={fname}
                                    onChangeText={setfName}
                                    inputRef={lnameRef}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        lnameRef.current?.focus()
                                    }
                                />
                                <Input
                                    marginTop={10}
                                    label={"Last Name:"}
                                    placeholder={"Enter your last name"}
                                    value={lname}
                                    onChangeText={setlName}
                                    inputRef={addressRef}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        addressRef.current?.focus()
                                    }
                                />
                                <Input
                                    marginTop={10}
                                    label={"Address:"}
                                    placeholder={"Enter your address"}
                                    value={address}
                                    onChangeText={setAddress}
                                    inputRef={contactRef}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        contactRef.current?.focus()
                                    }
                                />
                                <Input
                                    marginTop={10}
                                    label={"Contact:"}
                                    placeholder={"+63"}
                                    value={contact}
                                    onChangeText={(t) => {
                                        const prev = prevContactRef.current;
                                        const isDeleting =
                                            t.length < prev.length;

                                        if (isDeleting) {
                                            setContact(t);
                                        } else {
                                            setContact(formatContactNumber(t));
                                        }

                                        prevContactRef.current = t;
                                    }}
                                    inputRef={emailRef}
                                    keyboardType="number-pad"
                                    inputMode="numeric"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        emailRef.current?.focus()
                                    }
                                    leftIcon={
                                        <Image
                                            source={require("../assets/Images/icons/flag.png")}
                                            style={{ width: 20, height: 20 }}
                                            resizeMode="contain"
                                        />
                                    }
                                />
                                <Input
                                    marginTop={10}
                                    label={"Email:"}
                                    placeholder={"Enter your email"}
                                    value={email}
                                    onChangeText={setEmail}
                                    inputRef={passwordRef}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        passwordRef.current?.focus()
                                    }
                                />
                                <Input
                                    marginTop={10}
                                    label={"Password:"}
                                    placeholder={"Enter your password"}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={true}
                                    inputRef={rePasswordRef}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() =>
                                        rePasswordRef.current?.focus()
                                    }
                                />
                                <Input
                                    marginTop={10}
                                    label={"Confirm Password:"}
                                    placeholder={"Confirm your password"}
                                    value={rePassword}
                                    onChangeText={setRePassword}
                                    secureTextEntry={true}
                                    returnKeyType="done"
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
