import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import products from "../data/products";
import { Ionicons } from "@expo/vector-icons";
import { cartSlice } from "../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductQuery } from "../store/apiSlice";
const ProductDetailsScreen = ({ route }) => {
  const id = route.params.id;
  const { data, error, isLoading } = useGetProductQuery(route.params.id);

  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.error}</Text>;
  }

  if (!id) {
    return null;
  }
  if (!data) {
    return null;
  }
  const product = data;
  console.log(id);
  console.log(data);

  if (error) {
    return <Text>{error.error}</Text>;
  }
  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product: product }));
  };
  return (
    <View>
      <ScrollView>
        {/* Image Carousel */}

        <FlatList
          data={data.data.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{data.data.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${data.data.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{data.data.description}</Text>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>

      {/* Navigation icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  button: {
    backgroundColor: "black",
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#000000AA",
    borderRadius: 50,
    padding: 5,
  },
});

export default ProductDetailsScreen;
