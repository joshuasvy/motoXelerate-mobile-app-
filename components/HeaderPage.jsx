import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../constants/Colors";

const HeaderPage = ({ name, image, onPress }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={image} style={{ height: 110, width: 110 }} />
        </View>
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <Text style={[fonts.title, { marginRight: 30, marginTop: 25 }]}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.designWrapper}>
        <View
          style={{
            backgroundColor: colors.primary,
            width: 135,
            height: 38,
            marginBottom: 10,
          }}
        />
        <View
          style={{ backgroundColor: colors.secondary, width: 95, height: 38 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HeaderPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  logo: {
    height: 130,
    width: 130,
    borderWidth: 1,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  designWrapper: {
    alignItems: "flex-end",
  },
});
