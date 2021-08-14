import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const ItemView = (props) => {
  const item = props.storeItem;

  return (
    <TouchableWithoutFeedback onPress={props.onPressHandler}>
      <View key={item.id} style={styles.mainView}>
        <ImageBackground
          source={{ uri: item.imageURL }}
          style={styles.imageStyle}
          resizeMode="cover"
        >
          <View style={styles.headerStyle}>
            <Text style={styles.priceStyle}>${item.price}</Text>
          </View>
          <View style={styles.footerStyle}>
            <Entypo
              name="heart"
              size={25}
              color="red"
              style={{ flex: 0.5, textAlign: "center" }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.titleStyle} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <Entypo
              name="shopping-cart"
              size={25}
              color="red"
              style={{
                flex: 0.5,
                textAlign: "center",
              }}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    margin: 8,
    overflow: "hidden",
    borderRadius: 16,
  },
  imageStyle: {
    width: "100%",
    height: 260,
    justifyContent: "flex-end",
  },
  footerStyle: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 5,
    width: "100%",
    overflow: "hidden",
    justifyContent: "space-around",
    alignItems: "center",
    height: 55,
  },
  titleStyle: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerStyle: {
    alignSelf: "flex-start",
  },
  priceStyle: {},
});

export default ItemView;
