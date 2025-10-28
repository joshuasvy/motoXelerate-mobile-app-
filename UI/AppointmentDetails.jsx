import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../styles/AppointmentDetailStyle";
import Fonts from "../constants/Fonts";
import BreakLine from "../components/BreakLine";
import React from "react";

const AppointmentDetails = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <View style={styles.imageWrapper}>
        <Image
          source={require("../assets/Images/testingImage.jpg")}
          style={styles.imageStyle}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Image
              source={require("../assets/Images/back.png")}
              style={{ width: 37, height: 37 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Notification")}
          >
            <Image
              source={require("../assets/Images/notif.png")}
              style={{ width: 26, height: 26 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[Fonts.title, { fontSize: 22 }]}>Service Name</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/Images/star.png")}
              style={{ width: 15, height: 15, marginRight: 5 }}
            />
            <Text
              style={[
                Fonts.minitext,
                { fontSize: 11, letterSpacing: 1, color: "#797979" },
              ]}
            >
              4.5 <Text>(28 reviews)</Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[Fonts.semibold, { fontSize: 20 }]}>₱ 999.99</Text>
        </View>
        <Text style={[Fonts.subtext, { fontSize: 17, marginTop: 18 }]}>
          Description
        </Text>
        <Text style={[Fonts.regular, { marginTop: 18 }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <BreakLine />
        <Text style={[Fonts.subtext, { fontSize: 17 }]}>Importance</Text>
        <Text style={[Fonts.regular, { marginTop: 18 }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <BreakLine />
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[Fonts.subtext, { fontSize: 17 }]}>Reviews</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[Fonts.minitext, { marginTop: 2 }]}>View All</Text>
              <Image
                source={require("../assets/Images/next.png")}
                style={{ width: 20, height: 20, marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.reviewContainer}>
            <View style={styles.cardWrapper}>
              <Image
                source={require("../assets/Images/resume-pic.png")}
                style={styles.imageWrap}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={[Fonts.semibold, { fontSize: 13 }]}>
                    John Doe
                  </Text>
                </View>
                <Text
                  style={[
                    Fonts.regular,
                    {
                      fontSize: 12,
                      maxWidth: "100%",
                      marginTop: 5,
                    },
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </View>
            </View>

            <View style={styles.cardWrapper}>
              <Image
                source={require("../assets/Images/resume-pic.png")}
                style={styles.imageWrap}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={[Fonts.semibold, { fontSize: 13 }]}>
                    John Doe
                  </Text>
                </View>
                <Text
                  style={[
                    Fonts.regular,
                    {
                      fontSize: 12,
                      maxWidth: "100%",
                      marginTop: 5,
                    },
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <BreakLine />
        <View style={styles.textWrapper}>
          <TouchableOpacity
            style={[
              Fonts.title,
              {
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: 28,
                marginBottom: 8,
              },
            ]}
            onPress={() =>
              navigation.navigate("ServiceDetailsScreen", {
                name: encodeURIComponent(serviceName),
              })
            }
          >
            <Text
              style={[Fonts.regular, { fontSize: 13, textAlign: "center" }]}
            >
              Book Now?
            </Text>
          </TouchableOpacity>
          <Text style={[Fonts.regular, { fontSize: 13, textAlign: "center" }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AppointmentDetails;
