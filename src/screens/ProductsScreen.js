import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import products from "../data/products";
import { useSelector, useDispatch } from "react-redux";
import { productsSlice } from "../store/productsSlice";
import { useGetProductsQuery } from "../store/apiSlice";
const ProductsScreen = ({ navigation }) => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.error}</Text>;
  }

  if (!data) {
    return null;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data.data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Product Details", { id: item._id });
            }}
            style={styles.itemContainer}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
          </Pressable>
        )}
        numColumns={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
});
export default ProductsScreen;
