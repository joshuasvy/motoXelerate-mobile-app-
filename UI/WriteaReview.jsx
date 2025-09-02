import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/WriteaReviewStyle";
import React from "react";

const WriteaReview = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.headerWrapper}
          >
            <Image
              source={require("../assets/Images/back.png")}
              style={styles.backIcon}
            />
            <Text style={[fonts.regular, { fontSize: 18, marginTop: 3 }]}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Save button clicked")}
            style={styles.saveBtn}
          >
            <Text style={[fonts.regular, { fontSize: 18, marginTop: 3 }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reviewWrapper}>
          <Text style={[fonts.subtext]}>Review</Text>
          <TouchableOpacity actioveOpacity={0.8} style={styles.starBtn}>
            <Image
              source={require("../assets/Images/starOutline.png")}
              style={styles.starIcon}
            />
            <Image
              source={require("../assets/Images/starOutline.png")}
              style={styles.starIcon}
            />
            <Image
              source={require("../assets/Images/starOutline.png")}
              style={styles.starIcon}
            />
            <Image
              source={require("../assets/Images/starOutline.png")}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Write a review here..."
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Review button clicked")}
          style={styles.postBtn}
        >
          <Text style={[fonts.subtext, { textAlign: "center", marginTop: 5 }]}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WriteaReview;
