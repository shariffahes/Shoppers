import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../Constants/Colors";
import CustomText from "./CustomText";
import { Entypo } from "@expo/vector-icons";
const CartItemView = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View style={styles.circleAvatar}>
          <Text style={{ color: "white" }}>${props.price}</Text>
        </View>
        <View>
          <CustomText style={styles.title}>{props.title}</CustomText>
          <CustomText style={{ color: "grey", fontSize: 14 }}>
            {props.sum.toFixed(2)}
          </CustomText>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CustomText style={{ marginHorizontal: 12 }}>
          x{props.quantity}
        </CustomText>
        {props.onTrashHandler && (
          <Entypo
            name="trash"
            color="red"
            onPress={props.onTrashHandler}
            size={24}
            style={{ marginRight: 10 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "95%",
    alignSelf: "center",
    margin: 5,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    width: 140,
  },
  circleAvatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CartItemView;
