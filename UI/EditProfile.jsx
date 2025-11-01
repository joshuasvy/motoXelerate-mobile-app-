import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/EditProfileStyle";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import SimpleHeader from "../components/SimpleHeader";
import FilloutForm from "../components/FilloutForm";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_IMAGE =
    "https://res.cloudinary.com/dhh37ekzf/image/upload/v1761966774/Starter_pfp_ymrios.jpg";

const EditProfile = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [profileImage, setProfileImage] = useState(DEFAULT_IMAGE);

    const { user } = useContext(AuthContext);
    const userId = user?._id;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (!token) return;

                const response = await fetch(
                    "https://api-motoxelerate.onrender.com/api/user/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setFirstName(data.firstName || "");
                    setLastName(data.lastName || "");
                    setAddress(data.address || "");
                    setEmail(data.email || "");
                    setContact(data.contact || "");
                    setProfileImage(data.image || DEFAULT_IMAGE);
                } else {
                    console.error(
                        "❌ Failed to fetch user:",
                        data.message || data.error
                    );
                }
            } catch (error) {
                console.error("❌ Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);

    const pickImage = async () => {
        console.log("📸 Image picker triggered");

        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(
                "Permission required",
                "Enable gallery access to upload image."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log("📦 Picker result:", result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedUri = result.assets[0].uri;
            console.log("✅ Image selected:", selectedUri);
            setProfileImage(selectedUri);
        } else {
            console.log("⚠️ Picker canceled or no image selected");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <SimpleHeader
                title={"Edit Profile"}
                goBack={() => navigation.goBack()}
                saveBtn={() => navigation.goBack()}
                saveTxt={"Save"}
            />

            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                    <Image
                        source={{ uri: profileImage }}
                        style={styles.profile}
                        resizeMode="cover"
                    />
                    <Image
                        source={require("../assets/Images/icons/imageUpload.png")}
                        style={styles.uploadIcon}
                    />
                </TouchableOpacity>
            </View>

            <FilloutForm
                title={"First Name"}
                value={firstName}
                onChangeText={setFirstName}
            />
            <FilloutForm
                title={"Last Name"}
                value={lastName}
                onChangeText={setLastName}
            />
            <FilloutForm
                title={"Address"}
                value={address}
                onChangeText={setAddress}
            />
            <FilloutForm
                title={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            <FilloutForm
                title={"Contact"}
                value={contact}
                onChangeText={setContact}
                keyboardType={"numeric"}
            />

            <View style={styles.formWrapper}>
                <Text style={[Fonts.subtext, { fontSize: 16 }]}>Password</Text>
                <View style={styles.inputContainer}>
                    <Text style={[Fonts.regular, styles.input]}>********</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("ChangePassword")}
                    >
                        <Image
                            source={require("../assets/Images/next.png")}
                            style={styles.nextIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    borderWidth: 0.5,
                    borderColor: Colors.test,
                    borderRadius: 1,
                    marginHorizontal: 15,
                    marginTop: 5,
                }}
            />
        </SafeAreaView>
    );
};

export default EditProfile;
