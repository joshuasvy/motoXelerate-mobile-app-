import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../styles/HomeStyle";
import fonts from "../constants/Fonts";
import { useState } from "react";
import Scrollbtn from "../components/Scrollbtn";
import ProductCard from "../components/ProductCard";
import React from "react";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <View style={styles.header}>
        <View style={styles.logo} />
        <TextInput
          style={[fonts.regular, styles.input]}
          placeholder={"Search..."}
          value={search}
          onChangeText={setSearch}
        />
        <Image
          source={require("../assets/Images/search.png")}
          style={styles.searchIcon}
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Notification")}
          >
            <Image
              source={require("../assets/Images/notif.png")}
              style={{ height: 28, width: 28 }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={require("../assets/Images/chat.png")}
              style={{ height: 28, width: 28 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[fonts.header, { alignSelf: "center" }]}>MOTOXELERATE</Text>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "flex-start",
            paddingHorizontal: 15,
            marginTop: 5,
            marginBottom: 15,
          }}
        >
          <Scrollbtn label="Recommendation" marginRight={7} />
          <Scrollbtn label="Best Seller" marginRight={7} />
          <Scrollbtn
            label="Category"
            marginRight={7}
            imageBtn={require("../assets/Images/dropdown.png")}
          ></Scrollbtn>
          <Scrollbtn
            label="Brand"
            imageBtn={require("../assets/Images/dropdown.png")}
          />
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 15,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 13,
          }}
        >
          <ProductCard
            productImg={require("../assets/Images/testingImage.jpg")}
            name="Product Name"
            price="₱ 999.99"
            rate="4.5"
            review="(28 reviews)"
            onPress={() => navigation.navigate("Products")}
          />
          <ProductCard
            productImg={require("../assets/Images/testingImage.jpg")}
            name="Product Name"
            price="₱ 999.99"
            rate="4.5"
            review="(28 reviews)"
            onPress={() => navigation.navigate("Products")}
          />
          <ProductCard
            productImg={require("../assets/Images/testingImage.jpg")}
            name="Product Name"
            price="₱ 999.99"
            rate="4.5"
            review="(28 reviews)"
            onPress={() => navigation.navigate("Products")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
