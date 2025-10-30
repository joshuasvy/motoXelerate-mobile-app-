import { StyleSheet, Text, View, Image } from "react-native";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import React from "react";

export default function ProductCheckoutCard({ product }) {
  if (!product) {
    return (
      <View style={styles.emptyCard}>
        <Text style={[Fonts.subtext, styles.emptyText]}>
          No product selected
        </Text>
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 3 }}>
      <View style={styles.shadowWrapper}>
        <View style={styles.productWrapper}>
          <Image source={product.image} style={styles.productImage} />
          <View style={styles.padding}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[Fonts.subtext, styles.name]}
            >
              {product?.name?.trim() || "Unnamed product"}
            </Text>
            <View style={styles.infoWrapper}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[Fonts.regular, styles.specification]}
              >
                {product?.specification?.trim() ||
                  "No specification available."}
              </Text>
            </View>
            <View style={{ position: "absolute", right: 8, bottom: 3 }}>
              <Text
                style={[
                  Fonts.regular,
                  { fontSize: 13, color: Colors.test, marginLeft: 2 },
                ]}
              >
                X {product.quantity || 1}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderRadius: 8,
  },
  productWrapper: {
    backgroundColor: "#fff",
    flexDirection: "row",
    position: "relative",
    gap: 15,
    borderRadius: 8,

    overflow: "hidden",
  },
  padding: {
    paddingVertical: 4,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  infoWrapper: {
    position: "absolute",
    top: 55,
    alignItems: "flex-end",
  },
  name: {
    flexWrap: "wrap",
    fontSize: 14,
    width: 240,
    marginBottom: 6,
    marginTop: 4,
  },
  specification: {
    fontSize: 13,
    width: 210,
  },
});
