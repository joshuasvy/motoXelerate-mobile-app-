import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import React, { useState } from "react";

export default function QuantityforCartCard() {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 8;

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <SafeAreaView>
      <View stlye={styles.shadowWrapper}>
        <Text
          style={[
            Fonts.regular,
            {
              fontSize: 13,
              color: Colors.test,
              textAlign: "center",
              marginBottom: 3,
            },
          ]}
        >
          Quantity
        </Text>
        <View style={styles.quantity}>
          <TouchableOpacity activeOpacity={0.8} onPress={incrementQuantity}>
            <Text
              style={[Fonts.semibold, { fontSize: 16, paddingHorizontal: 3 }]}
            >
              +
            </Text>
          </TouchableOpacity>
          <Text style={[Fonts.subtext, { fontSize: 15, color: "#fff" }]}>
            |
          </Text>
          <Text style={[Fonts.semibold, { fontSize: 15 }]}>{quantity}</Text>
          <Text style={[Fonts.subtext, { fontSize: 14, color: "#fff" }]}>
            |
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={decrementQuantity}>
            <Text
              style={[Fonts.semibold, { fontSize: 16, paddingHorizontal: 3 }]}
            >
              -
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 13,
    marginBottom: 12,
    backgroundColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  quantity: {
    width: 100,
    height: 35,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
});
