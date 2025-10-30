import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import React from "react";
import { formattedDateTime } from "../utils/formattedDateTIme";

export default function AppointmentHistoryCard({
  service_Type,
  date,
  time,
  status,
  onPress,
}) {
  const { formattedDate, formattedTime } = formattedDateTime(date, time);

  return (
    <View style={styles.container}>
      <View style={styles.shadowWrapper}>
        <View style={styles.wrapper}>
          <Image
            source={require("../assets/Images/testingImage.jpg")}
            style={styles.imageWrap}
          />
          <View style={styles.infoWrapper}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[Fonts.subtext, { fontSize: 15, width: "100%" }]}
            >
              {service_Type}
            </Text>

            <View style={{ position: "absolute", bottom: 6, width: "100%" }}>
              <Text style={[Fonts.subtext, { fontSize: 14, marginTop: 13 }]}>
                Date:{" "}
                <Text
                  style={[Fonts.regular, { fontSize: 14, color: "#565656ff" }]}
                >
                  {formattedDate}
                </Text>
              </Text>
              <Text style={[Fonts.subtext, { fontSize: 14 }]}>
                Time:{" "}
                <Text
                  style={[Fonts.regular, { fontSize: 14, color: "#565656ff" }]}
                >
                  {formattedTime}
                </Text>
              </Text>

              <View style={styles.statusRow}>
                <View style={styles.statusWrapper}>
                  <Text
                    style={[Fonts.regular, { fontSize: 13, color: "#ffffff" }]}
                  >
                    {status}
                  </Text>
                </View>
                {onPress && (
                  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                    <Image
                      source={require("../assets/Images/next.png")}
                      style={styles.nextIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  shadowWrapper: {
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  wrapper: {
    flexDirection: "row",
    borderRadius: 8,
    width: 375,
    height: 150,
    position: "relative",
  },
  imageWrap: {
    width: 130,
    height: "fit-content",
    margin: 3,
    resizeMode: "cover",
    borderRadius: 8,
  },
  infoWrapper: {
    marginHorizontal: 8,
    paddingVertical: 5,
    width: 230,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  statusWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  nextIcon: {
    width: 26,
    height: 26,
  },
});
