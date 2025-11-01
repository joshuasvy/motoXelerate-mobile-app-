import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import styles from "../styles/CancelOrderStyle";
import SimpleHeader from "../components/SimpleHeader";
import AddressWrapper from "../components/AddressWrapper";
import NormalCard from "../components/NormalCard";
import BreakLine from "../components/BreakLine";
import PaymentMethod from "../components/PaymentMethod";
import CancelCheckoutBtn from "../components/CancelCheckoutBtn";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";

const CancelOrder = ({ navigation }) => {
    const [cancelOrder, setCancelOrder] = useState(false);
    const route = useRoute();
    const item = route.params?.item;
    const address = route.params?.address;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
            <SimpleHeader goBack={() => navigation.goBack()} />
            <AddressWrapper
                address={address}
            />

            <View style={{ marginTop: 25, marginVertical: 15 }}>
                <NormalCard
                    display={{
                        uri: item?.image?.startsWith("http")
                            ? item.image
                            : "https://via.placeholder.com/100",
                    }}
                    name={item?.productName || "Unnamed Product"}
                    specification={
                        item?.specification ||
                        "No specification available for this Product."
                    }
                />
            </View>

            <BreakLine />
            <PaymentMethod method={item?.paymentMethod || "Cash on Delivery"} />
            <CancelCheckoutBtn />
        </SafeAreaView>
    );
};

export default CancelOrder;
