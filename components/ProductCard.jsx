import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Fonts from "../constants/Fonts";
import product from "../data/product";
import React from "react";

const ProductCard = ({ product, onPress }) => {
  return (
    <View style={styles.shadowWrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.wrapper}
        onPress={onPress}
      >
        <Image source={product.image} style={styles.image} />
        <View style={styles.content}>
          <Text
            style={[Fonts.regular, styles.name]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product.name}
          </Text>
          <Text style={[Fonts.semibold, styles.price]}>{product.price}</Text>
          <View style={styles.ratingRow}>
            <Image
              source={require("../assets/Images/star.png")}
              style={styles.star}
            />
            <Text style={styles.reviewText}>
              {product.rate} {`(${product.review} reviews)`}
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
    borderRadius: 8,
    backgroundColor: "#fff",
    minHeight: 230,
  },

  image: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  name: {
    fontSize: 15,
    lineHeight: 18,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  star: {
    width: 14,
    height: 14,
  },
  reviewText: {
    fontSize: 10,
    color: "#797979",
    marginLeft: 5,
  },
});
