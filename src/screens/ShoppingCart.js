import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import cart from "../data/cart";
import CartListItem from "../components/CartListItem";
import { useSelector } from "react-redux";
import {
  selectDeliveryPrice,
  selectSubTotal,
  selectTotal,
} from "../store/cartSlice";
const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubTotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{delivery}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total}</Text>
      </View>
    </View>
  );
};
const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.items);
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <View style={styles.footer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderColor: "gainsboro",
    borderTopWidth: 1,
    padding: 20,
  },

  button: {
    width: "100%",
    backgroundColor: "black",
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
});
export default ShoppingCart;
