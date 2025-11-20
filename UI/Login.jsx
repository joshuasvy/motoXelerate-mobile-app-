import { View, Text, StatusBar, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { validateLogin, validateField } from "../utils/validation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../styles/LoginStyle";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import OutsideHeader from "../components/OutsideHeader";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});

    const LOGIN_URL = "https://api-motoxelerate.onrender.com/api/user/login";
    const { setUser } = useContext(AuthContext);

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                LOGIN_URL,
                {
                    email: email.trim().toLowerCase(),
                    password: password.trim(),
                },
                {
                    headers: { "Content-Type": "application/json" },
                    validateStatus: () => true,
                }
            );

            console.log("📡 Login response:", {
                status: response.status,
                message: response.data?.message,
                data: response.data,
            });

            if (response.status === 404) {
                console.warn("❌ No user found:", email);
                setErrors((prev) => ({
                    ...prev,
                    email: "Email does not exist",
                }));
                return null;
            }

            if (response.status === 401) {
                console.warn("❌ Incorrect password for:", email);
                setErrors((prev) => ({
                    ...prev,
                    password: "Incorrect password",
                }));
                return null;
            }

            if (response.status !== 200) {
                console.warn("⚠️ Other login error:", response.data?.message);
                setErrors((prev) => ({
                    ...prev,
                    email: response.data?.message || "Login failed",
                }));
                return null;
            }

            return response.data;
        } catch (err) {
            console.error("❌ Axios login error:", err.message);
            setErrors((prev) => ({
                ...prev,
                email: "Server error. Please try again later.",
            }));
            return null;
        }
    };

    const handleLogin = async () => {
        console.log("📥 Attempting login with:", { email, password });

        // ✅ New combined empty check
        if (!email && !password) {
            setErrors({
                email: "Please enter your email and password",
            });
            console.warn("⚠️ Login blocked: missing both email and password");
            return;
        }

        if (!email) {
            setErrors({
                email: "Please enter your email",
            });
            console.warn("⚠️ Login blocked: missing email");
            return;
        }

        if (!password) {
            setErrors({
                password: "Please enter your password",
            });
            console.warn("⚠️ Login blocked: missing password");
            return;
        }

        // client-side validation (only email format now)
        const newErrors = validateLogin(email, password);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const res = await login(email, password);
        if (!res) return;

        const { token, user } = res;
        if (!token || !user) {
            setErrors((prev) => ({
                ...prev,
                email: "Invalid login response from server.",
            }));
            return;
        }

        // ✅ success
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        if (rememberMe) {
            await AsyncStorage.setItem("userEmail", email);
            await AsyncStorage.setItem("userPassword", password);
        } else {
            await AsyncStorage.removeItem("userEmail");
            await AsyncStorage.removeItem("userPassword");
        }

        navigation.navigate("Tab");
    };

    useEffect(() => {
        const loadCredentials = async () => {
            const savedEmail = await AsyncStorage.getItem("userEmail");
            const savedPassword = await AsyncStorage.getItem("userPassword");

            if (savedEmail && savedPassword) {
                setEmail(savedEmail);
                setPassword(savedPassword);
                setRememberMe(true);
            }
        };

        loadCredentials();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <OutsideHeader
                name={"Sign up"}
                onPress={() => navigation.navigate("Signup")}
            />
            <View style={styles.wrapper}>
                <Text style={[Fonts.header, { marginBottom: 20 }]}>Login</Text>
                <Input
                    label="Email:"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    error={errors.email}
                />

                <Input
                    label="Password:"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    error={errors.password}
                />

                <View style={styles.checkboxWrapper}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        activeOpacity={0.8}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View
                            style={{
                                width: 13,
                                height: 13,
                                backgroundColor: rememberMe
                                    ? Colors.primary
                                    : "#fff",
                                borderRadius: 3,
                                borderWidth: 1,
                                borderColor: "#a8a8a8ff",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {rememberMe && (
                                <View
                                    style={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: 1,
                                    }}
                                />
                            )}
                        </View>
                        <Text style={[Fonts.regular, { fontSize: 14 }]}>
                            Remember me
                        </Text>
                    </TouchableOpacity>

                    <Text
                        style={[
                            Fonts.regular,
                            { fontSize: 14, color: Colors.secondary },
                        ]}
                    >
                        Forgot Password
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        style={styles.button}
                        title="Login"
                        width={120}
                        height={50}
                        backgroundColor={Colors.primary}
                        onPress={handleLogin}
                    />
                </View>
            </View>
            <View style={styles.footerWrapper}>
                <Text
                    style={[
                        Fonts.regular,
                        { textAlign: "center", padding: 40, fontSize: 17 },
                    ]}
                >
                    By continuing, you agree to our{" "}
                    <Text style={{ fontWeight: "bold" }}>
                        Terms and Conditions
                    </Text>{" "}
                    and have read our{" "}
                    <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Login;
