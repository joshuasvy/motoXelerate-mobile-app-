import { StyleSheet, View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressWrapper from "../components/AddressWrapper";
import SimpleHeader from "../components/SimpleHeader";
import NormalCard from "../components/NormalCard";
import BreakLine from "../components/BreakLine";
import PaymentMethod from "../components/PaymentMethod";
import CheckoutButton from "../components/CheckoutButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import React from "react";

const BuyingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <SimpleHeader goBack={() => navigation.goBack()} />
      <View style={{ marginBottom: 10 }}>
        <AddressWrapper nextIcon={require("../assets/Images/next.png")} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <NormalCard
          display={require("../assets/Images/testingImage.jpg")}
          name={"Product Name"}
        />
      </View>
      <BreakLine />
      <Text style={[Fonts.subtext, { fontSize: 17 }]}>Specification</Text>
      <Text style={[Fonts.regular, { marginTop: 18 }]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <BreakLine />
      <PaymentMethod
        nextIcon={require("../assets/Images/next.png")}
        onPress={() => console.log("Next Clicked")}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <CheckoutButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonWrapper: {
    height: 105,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BuyingScreen;
