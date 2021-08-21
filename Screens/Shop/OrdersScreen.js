import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import OrderItemView from "../../Components/OrderItemView";
import Colors from "../../Constants/Colors";
import { fetchOrdersHistory } from "../../Store/actions/Order";

const OrderScreen = (_) => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(fetchOrdersHistory())
      .then((_) => setLoading(false))
      .catch((err) => console.log(err));
  }, [dispatch]);
  const renderList = ({ item }) => {
    return (
      <OrderItemView
        date={item.readableDate}
        amount={item.totalAmount}
        items={item.products}
      />
    );
  };
  if (isLoading)
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  return <FlatList data={orders} renderItem={renderList} />;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OrderScreen;
