import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../../Components/CustomText";
import Colors from "../../Constants/Colors";
import CartItemView from "../../Components/CartItemView";
import { removeFromCart } from "../../Store/actions/Cart";
import { orderItems } from "../../Store/actions/Order";

const CartScreen = (_) => {
  const cartState = useSelector((state) => state.carts);
  const total = cartState.totalAmount;
  let items = [];
  for (const key in cartState.items) {
    items.push({
      id: key,
      price: cartState.items[key].productPrice,
      name: cartState.items[key].productTitle,
      quantity: cartState.items[key].quantity,
      sum: cartState.items[key].sum,
    });
  }
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const renderList = ({ item }) => {
    return (
      <CartItemView
        title={item.name}
        price={item.price}
        sum={item.sum}
        quantity={item.quantity}
        onTrashHandler={() => dispatch(removeFromCart(item.id))}
      />
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.summaryContainer}>
        <CustomText style={styles.amountStyle}>
          Total: <CustomText>{total.toFixed(2)}</CustomText>
        </CustomText>
        {!isLoading ? (
          <Button
            title="Order Now"
            color={Colors.accent}
            disabled={items.length === 0}
            onPress={() => {
              setLoading(true);
              dispatch(orderItems(items, total)).then((_) => setLoading(false));
            }}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <FlatList data={items} renderItem={renderList} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    margin: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
    shadowOpacity: 0.3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 10,
  },
  amountStyle: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: Colors.primary,
  },
});

export default CartScreen;
