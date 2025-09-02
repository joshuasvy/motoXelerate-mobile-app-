import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import fonts from "../constants/Fonts";
import React from "react";

const screenWidth = Dimensions.get("window").width;

const ProductCard = ({ onPress, productImg, name, price, rate, review }) => {
  return (
    <View style={styles.shadowWrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.wrapper}
      >
        <Image source={productImg} style={styles.image} />
        <View style={{ paddingHorizontal: 8, marginTop: 8 }}>
          <Text style={[fonts.regular, { fontSize: 17 }]}>{name}</Text>
          <Text style={[fonts.semibold, { fontSize: 16, marginTop: 4 }]}>
            {price}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Image
              source={require("../assets/Images/star.png")}
              style={{ width: 14, height: 14 }}
            />
            <Text
              style={[
                fonts.minitext,
                { fontSize: 10, color: "#797979", marginLeft: 5, marginTop: 2 },
              ]}
            >
              {rate} <Text>{review}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  shadowWrapper: {
    // width: screenWidth * 0.45,
    width: "49%",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  wrapper: {
    height: 230,
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "55%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
