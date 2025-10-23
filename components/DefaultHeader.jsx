import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import React from "react";

export default function DefaultHeader({
  goBack,
  title,
  backIcon,
  back,
  notifPress,
  chatPress,
}) {
  return (
    <View style={styles.container}>
      <Text style={[Fonts.header, styles.title]}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={goBack}
        style={styles.backWrapper}
      >
        <Image source={backIcon} style={styles.backIcon} />
        <Text style={[Fonts.regular, { fontSize: 18, marginTop: 3 }]}>
          {back}
        </Text>
      </TouchableOpacity>
      <View style={styles.iconWrapper}>
        <TouchableOpacity activeOpacity={0.8} onPress={notifPress}>
          <Image
            source={require("../assets/Images/notif.png")}
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={chatPress}>
          <Image
            source={require("../assets/Images/chat.png")}
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    position: "relative",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  backWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  iconWrapper: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
    gap: 10,
  },
  icons: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
