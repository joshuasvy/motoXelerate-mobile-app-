import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import BreakLine from "./BreakLine";
import Fonts from "../constants/Fonts";
import React from "react";
import VariantSelector from "./VariantSelector";

export default function VariantSelection({ visibility, onClose }) {
  return (
    <Modal
      isVisible={visibility}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      backdropOpacity={0.3}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <Text
              style={[
                Fonts.subtext,
                { fontSize: 17, textAlign: "center", marginBottom: -6 },
              ]}
            >
              Select Variant
            </Text>
            <View>
              <BreakLine />
            </View>
          </View>
          <View style={styles.modalContent}>
            <VariantSelector />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    width: "100%",
    height: "45%",
    backgroundColor: "#fbfbfbff",
    alignItems: "center",
    padding: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  modalHeader: {
    width: "100%",
  },
  modalContent: {
    width: "100%",
    height: "80%",
    marginTop: -10,
    borderWidth: 1,
  },
});
