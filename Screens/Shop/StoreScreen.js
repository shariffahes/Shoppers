import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import ItemView from "../../Components/ItemView";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../Components/CustomHeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";
import * as cartActions from "../../Store/actions/Cart";

const StoreScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: (options) => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              iconName="shopping-cart"
              onPress={() => {
                props.navigation.navigate("My Cart");
              }}
              color={options.tintColor}
            />
            <Item
              iconName="dots-three-vertical"
              onPress={() => {}}
              color={options.tintColor}
            />
          </HeaderButtons>
        );
      },
    });
  }, []);

  const createItems = (items) => {
    return (
      <ItemView
        storeItem={items.item}
        onPressHandler={() => {
          props.navigation.navigate("Details", {
            title: items.item.name,
            productId: items.item.id,
          });
        }}
      >
        <Entypo
          name="heart"
          size={25}
          color={Colors.accent}
          style={{ flex: 0.5, textAlign: "center" }}
        />

        <Entypo
          onPress={() => {
            dispatch(cartActions.addToCart(items.item));
          }}
          name="shopping-cart"
          size={25}
          color={Colors.accent}
          style={{
            flex: 0.5,
            textAlign: "center",
          }}
        />
      </ItemView>
    );
  };
  return <FlatList data={products} renderItem={createItems} numColumns={2} />;
};

const styles = StyleSheet.create({});

export default StoreScreen;
