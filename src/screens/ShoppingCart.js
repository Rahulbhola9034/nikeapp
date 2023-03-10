import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import cart from "../data/cart";
import CartListItem from "../components/CartListItem";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../store/apiSlice";
import {
  cartSlice,
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
  const subtotal = useSelector(selectSubTotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
  console.log(error, isLoading);
  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cart,
      subtotal,
      delivery,
      total,
      customer: {
        name: "John",
        address: "My home",
        email: "John@notjust.dev",
      },
    });

    if (result.data?.status === "OK") {
      Alert.alert(
        "Order has been submitted",
        `Your order reference is: ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
  };
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <View style={styles.footer}>
        <Pressable onPress={onCreateOrder} style={styles.button}>
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
