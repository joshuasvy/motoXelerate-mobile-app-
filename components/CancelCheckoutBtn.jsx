import { StyleSheet, Text, View } from "react-native";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import ProductBtn from "./ProductBtn";
import CustomModal from "./CustomModal";
import React, { useState } from "react";

const CancelCheckoutBtn = () => {
    const [cancelOrder, setCancelOrder] = useState(false);

    return (
        <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
                <View style={styles.priceContainer}>
                    <Text style={[Fonts.title, styles.totalPrice]}>
                        Total Price
                    </Text>
                    <Text style={[Fonts.semibold, styles.price]}>₱99.99</Text>
                </View>
                <View style={styles.breakLine} />
                <ProductBtn
                    name={"Cancel Order"}
                    backgroundColor={Colors.secondary}
                    onPress={() => setCancelOrder(true)}
                    width={170}
                    color={"#fff"}
                    fontSize={14}
                    btnIcon={require("../assets/Images/icons/cancel.png")}
                />
                <CustomModal
                    visibility={cancelOrder}
                    onPress={() => {
                        setCancelOrder(false);
                    }}
                    iconModal={require("../assets/Images/icons/sad.png")}
                    textModal={"Ordered Cancel Successfully"}
                />
            </View>
        </View>
    );
};

export default CancelCheckoutBtn;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    buttonWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    priceContainer: {
        marginLeft: 25,
    },
    totalPrice: {
        color: Colors.test,
        fontSize: 14,
    },
    price: {
        fontSize: 22,
    },
    breakLine: {
        backgroundColor: "#fff",
        width: 1,
        height: 70,
        marginLeft: 67,
    },
});
