import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ModalVariantSelection({
  visibility,
  onClose,
  variants = [], // ✅ fallback to empty array
}) {
  const [selectedVariant, setSelectedVariant] = useState("");

  useEffect(() => {
    if (!visibility) {
      setSelectedVariant(""); // ✅ reset when modal closes
    }
  }, [visibility]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Select Variant</Text>
      <View style={styles.variantContainer}>
        {variants.length > 0 ? (
          variants.map((variant, index) => {
            const isSelected = selectedVariant === variant;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedVariant(variant)}
                style={[
                  styles.variantButton,
                  isSelected ? styles.selected : styles.unselected,
                ]}
              >
                <Text
                  style={[
                    styles.variantText,
                    isSelected && styles.selectedText,
                  ]}
                >
                  {variant}
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.emptyText}>No variants available.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 10,
  },
  variantContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  variantButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  variantText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  selected: {
    backgroundColor: "#047857",
    borderColor: "#047857",
  },
  selectedText: {
    color: "#ffffff",
  },
  unselected: {
    backgroundColor: "#ffffff",
    borderColor: "#D1D5DB",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    marginTop: 10,
  },
});
