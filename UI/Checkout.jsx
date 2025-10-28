import React from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import DefaultHeader from "../components/DefaultHeader";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import product from "../data/product";
import ProductBtn from "../components/ProductBtn";

export default function Checkout({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#fff" />
      <DefaultHeader
        title={"Checkout"}
        goBack={navigation.goBack}
        backIcon={require("../assets/Images/back.png")}
        back={"Back"}
      />

      <View style={styles.wrapper}>
        <View style={styles.card}>
          {/* Address Header */}
          <View style={styles.addressHeader}>
            <Image
              source={require("../assets/Images/icons/address.png")}
              style={styles.icon}
            />
            <Text style={[Fonts.semibold, styles.title]}>Address</Text>
          </View>

          <View style={styles.divider} />

          {/* Address Info */}
          <View style={styles.infoRow}>
            <Text style={[Fonts.subtext, { fontSize: 17, marginBottom: 5 }]}>
              John Doe
            </Text>
            <Text style={[Fonts.regular, styles.infoText]}>09999 999 9999</Text>
            <Text style={[Fonts.regular, styles.infoText]}>
              Blk 13 Lot 82 Phase 3F Lorem ipsum Consectetur adipiscing
            </Text>
          </View>

          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeBtnText}>Change</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 7,
            marginBottom: 15,
          }}
        >
          <Image
            source={product[0].image}
            style={{
              width: 130,
              height: 130,
              resizeMode: "contain",
            }}
          />
          <View style={{ marginTop: 8 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[Fonts.subtext, { fontSize: 14, marginBottom: 6 }]}
            >
              {product[0].name}
            </Text>
            <Text style={[Fonts.regular, { fontSize: 13, width: 210 }]}>
              {product[0].specification}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={{ marginVertical: 25 }}>
          <Text style={[Fonts.subtext, { fontSize: 16 }]}>
            Method of Payment
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 13 }}
            >
              <Image
                source={require("../assets/Images/logo/gcash.png")}
                style={{
                  width: 28,
                  height: 28,
                  resizeMode: "contain",
                }}
              />
              <Text style={[Fonts.regular]}>0999 999 9999</Text>
            </View>
            <Image
              source={require("../assets/Images/next.png")}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            height: 200,
            paddingHorizontal: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ gap: 2 }}>
              <Text
                style={[Fonts.subtext, { fontSize: 16, color: Colors.price }]}
              >
                Price
              </Text>
              <Text style={[Fonts.semibold, { fontSize: 20 }]}>
                {product[0].price}
              </Text>
            </View>

            <ProductBtn
              name={"Check Out"}
              backgroundColor={"#047857"}
              fontSize={16}
              color={"#FFFFFF"}
              btnIcon={require("../assets/Images/bag.png")}
              width={165}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#f9f9f9ff",
    height: 235,
    padding: 20,
    marginVertical: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginBottom: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  divider: {
    height: 1,
    backgroundColor: "#999",
    marginVertical: 13,
  },
  infoRow: {
    gap: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#000",
  },
  changeBtn: {
    backgroundColor: "#047857",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 8,
    position: "absolute",
    right: 12,
    bottom: 10,
  },
  changeBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});
