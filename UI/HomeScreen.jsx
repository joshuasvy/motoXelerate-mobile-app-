import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/HomeStyle";
import Fonts from "../constants/Fonts";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://api-motoxelerate.onrender.com/api/product"
      );
      const mapped = res.data.map((p) => ({
        id: p._id,
        name: p.product_Name,
        image: { uri: p.image },
        price: p.product_Price,
        stock: p.stock.toString(),
        category: p.category,
        specification: p.product_Specification,
        rate: "4.5", // placeholder
        review: "12", // placeholder
      }));
      setProducts(mapped);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <View style={styles.header}>
        <View style={styles.logo} />
        <TextInput
          style={[Fonts.regular, styles.input]}
          placeholder={"Search..."}
          value={search}
          onChangeText={setSearch}
        />
        <Image
          source={require("../assets/Images/search.png")}
          style={styles.searchIcon}
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Notification")}
          >
            <Image
              source={require("../assets/Images/notif.png")}
              style={{ height: 28, width: 28 }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={require("../assets/Images/chat.png")}
              style={{ height: 28, width: 28 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[Fonts.header, { alignSelf: "center" }]}>MOTOXELERATE</Text>
      <View></View>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            marginHorizontal: 15,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 13,
          }}
        >
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() =>
                  navigation.navigate("Products", { product: item })
                }
              />
            )}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 4, // ✅ vertical gap between rows
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default HomeScreen;
