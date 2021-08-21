import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import OrderItemView from "../../Components/OrderItemView";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  const dispatch = useDispatch;
  const renderList = ({ item }) => {
    return (
      <OrderItemView
        date={item.readableDate}
        amount={item.totalAmount}
        items={item.products}
      />
    );
  };

  return <FlatList data={orders} renderItem={renderList} />;
};

const styles = StyleSheet.create({});

export default OrderScreen;
