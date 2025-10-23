import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/EditProfileStyle";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import SimpleHeader from "../components/SimpleHeader";
import FilloutForm from "../components/FilloutForm";
import React, { useState } from "react";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

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
        <View style={styles.profile}></View>
      </View>
      <FilloutForm
        title={"Name"}
        placeholder={"John Doe"}
        value={name}
        onChangeText={setName}
      />
      <FilloutForm
        title={"Address"}
        placeholder={"Blk 13 Lot 82 Phase 3 Sub-Urban, Taguig, Metro Manila"}
        value={address}
        onChangeText={setAddress}
      />
      <FilloutForm
        title={"Email"}
        placeholder={"motoxelerate@example.me"}
        value={email}
        onChangeText={setEmail}
      />
      <FilloutForm
        title={"Contact"}
        placeholder={"+63 912 345 6789"}
        value={contact}
        onChangeText={setContact}
        keyboardType={"numeric"}
      />
      <View style={styles.formWrapper}>
        <Text style={[Fonts.subtext]}>Password</Text>
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
          borderWidth: 1,
          height: 0.2,
          borderRadius: 1,
          marginHorizontal: 15,
          backgroundColor: Colors.test,
        }}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
