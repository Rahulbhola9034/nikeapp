import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Navigation from "./src/navigation";
export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
});
