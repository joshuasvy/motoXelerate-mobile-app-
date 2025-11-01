import { View, Text, StatusBar, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
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

    const LOGIN_URL = "https://api-motoxelerate.onrender.com/api/user/login";
    const { setUser } = useContext(AuthContext);

    const login = async (email, password) => {
        console.log("📡 Sending login request to:", LOGIN_URL);
        const response = await axios.post(LOGIN_URL, { email, password });
        console.log("📡 Full Axios response:", response);
        return response.data;
    };

    const handleLogin = async () => {
        console.log("📥 Attempting login with:", { email, password });

        try {
            const res = await login(email, password);
            console.log("🧪 Login response:", res);

            const { token, user } = res;

            if (!token || !user) {
                console.log("❌ Missing token or user in response:", res);
                throw new Error("Invalid login response from server.");
            }

            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("user", JSON.stringify(user));
            setUser(user);

            console.log("🔐 Token saved:", token);
            console.log("👤 User saved:", user);

            if (rememberMe) {
                await AsyncStorage.setItem("userEmail", email);
                await AsyncStorage.setItem("userPassword", password);
            } else {
                await AsyncStorage.removeItem("userEmail");
                await AsyncStorage.removeItem("userPassword");
            }

            navigation.navigate("Tab");
            Alert.alert("✅ Login Successful", `Welcome, ${user.name}`);
        } catch (err) {
            console.error("❌ Full login error:", err);
            const errorMsg =
                err?.response?.data?.message || err.message || "Login failed";
            Alert.alert("Error", errorMsg);
        }
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
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <OutsideHeader
                name={"Sign up"}
                onPress={() => navigation.navigate("Signup")}
            />
            <View style={styles.wrapper}>
                <Text style={[Fonts.header, { marginBottom: 20 }]}>Login</Text>
                <Input
                    label={"Email:"}
                    placeholder={"Enter your email"}
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    marginTop={18}
                    label={"Password:"}
                    placeholder={"Enter your password"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
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
