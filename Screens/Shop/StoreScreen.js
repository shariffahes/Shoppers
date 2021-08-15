import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import ItemView from "../../Components/ItemView";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../Components/CustomHeaderButton";
import { useSelector } from "react-redux";

const StoreScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

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
      />
    );
  };
  return <FlatList data={products} renderItem={createItems} numColumns={2} />;
};

const styles = StyleSheet.create({});

export default StoreScreen;
