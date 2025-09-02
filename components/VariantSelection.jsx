import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import BreakLine from "./BreakLine";
import React from "react";

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
            <Text>Select Variant</Text>
            <BreakLine />
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
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  modalHeader: {},
  closeIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
