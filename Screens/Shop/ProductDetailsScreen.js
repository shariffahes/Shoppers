import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../../Components/CustomText";
import * as CartActions from "../../Store/actions/Cart";

const ProductDetailsScreen = (props) => {
  const id = props.route.params.productId;
  const product = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === id)
  );
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <View style={styles.mainView}>
        <Image
          style={styles.imageStyle}
          source={{ uri: product.imageURL }}
          resizeMode="cover"
        />
        <Button
          title="Add to Cart"
          style={{ height: 50 }}
          onPress={() => dispatch(CartActions.addToCart(product))}
        />
        <CustomText style={styles.price}>
          ${product.price.toFixed(2)}
        </CustomText>
        <CustomText style={styles.title}>Description: </CustomText>
        <CustomText style={styles.description}>
          {product.description}
        </CustomText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
  imageStyle: {
    width: "100%",
    height: "50%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 25,
    textAlign: "center",
    margin: 10,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 10,
  },
});

export default ProductDetailsScreen;
