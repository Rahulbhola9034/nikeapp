import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
export default function App() {
  return (
    <View style={styles.container}>
      <ProductDetailsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
