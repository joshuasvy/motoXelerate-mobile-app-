import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { useCart } from "../context/CartContext";

export default function CartCard({ product, onPress, onRemove }) {
  const { updateQuantity, toggleSelectItem, selectedItems } = useCart();
  const isSelected = selectedItems.includes(product.id);

  // Safely parse price
  const priceValue = parseFloat(product.price?.replace(/[^\d.]/g, "") || "0");

  return (
    <View style={styles.container}>
      <View style={styles.shadowWrapper}>
        <View style={styles.wrapper}>
          {/* Product Image */}
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <Image source={product.image} style={styles.imageWrap} />
          </TouchableOpacity>

          {/* Product Info */}
          <View style={styles.infoWrapper}>
            <Text
              style={[Fonts.subtext, { fontSize: 16, marginRight: 30 }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {product.name}
            </Text>
            <Text style={[Fonts.subtext, { fontSize: 15, marginTop: 10 }]}>
              Color: <Text>{product.color}</Text>
            </Text>
            <Text style={[Fonts.subtext, { fontSize: 15 }]}>
              Type: <Text>{product.type}</Text>
            </Text>
            <Text style={[Fonts.semibold, { fontSize: 18, marginTop: 5 }]}>
              ₱{priceValue.toLocaleString()}
            </Text>
          </View>

          {/* Checkbox + Remove */}
          <View style={styles.iconWrapper}>
            <View style={{ transform: [{ scale: 0.9 }], marginTop: -7 }}>
              <Checkbox
                status={isSelected ? "checked" : "unchecked"}
                onPress={() => toggleSelectItem(product.id)}
                color={Colors.primary}
                uncheckedColor="#000"
                style={styles.checkbox}
              />
            </View>
            <TouchableOpacity onPress={onRemove}>
              <Text
                style={[
                  Fonts.minitext,
                  {
                    color: "red",
                    fontSize: 14,
                    marginTop: 77,
                    marginRight: 10,
                  },
                ]}
              >
                Remove
              </Text>
            </TouchableOpacity>
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
    width: 358,
    maxHeight: 155,
    position: "relative",
  },
  imageWrap: {
    width: 145,
    height: 150,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infoWrapper: {
    width: 210,
    paddingLeft: 15,
    justifyContent: "center",
    marginTop: 8,
  },
  quantityContainer: {
    position: "absolute",
    right: 10,
    bottom: 8,
  },
  iconWrapper: {
    position: "absolute",
    right: 5,
    top: 9,
    alignItems: "flex-end",
  },
  checkbox: {
    width: 23,
    height: 23,
  },
});
