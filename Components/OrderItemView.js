import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import Colors from "../Constants/Colors";
import CartItemView from "./CartItemView";
import CustomText from "./CustomText";

const OrderItemView = (props) => {
  const [isDetailsShown, setShowDetails] = useState(false);

  return (
    <View style={styles.main}>
      <View style={styles.info}>
        <CustomText style={{ fontSize: 15, fontFamily: "open-sans-bold" }}>
          Total: {props.amount.toFixed(2)}
        </CustomText>
        <CustomText>{props.date}</CustomText>
      </View>
      <Button
        title={isDetailsShown ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {isDetailsShown && (
        <View style={{ width: "100%" }}>
          {props.items.map((product) => (
            <CartItemView
              price={product.price}
              title={product.name}
              sum={product.sum}
              quantity={product.quantity}
              key={product.id}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
});

export default OrderItemView;
