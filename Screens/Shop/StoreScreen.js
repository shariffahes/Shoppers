import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import ItemView from "../../Components/ItemView";
import { ITEMS } from "../../Modal/Data/dummy";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../Components/CustomHeaderButton";
const StoreScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: (options) => {
        return (
          <HeaderButtons
            color={options.tintColor}
            HeaderButtonComponent={CustomHeaderButton}
          >
            <Item
              iconName="shopping-cart"
              onPress={() => {
                props.navigation.navigate("My Cart");
              }}
            />
            <Item iconName="dots-three-vertical" onPress={() => {}} />
          </HeaderButtons>
        );
      },
    });
  });

  const createItems = (items) => {
    return (
      <ItemView
        storeItem={items.item}
        onPressHandler={() => {
          props.navigation.navigate("Details");
        }}
      />
    );
  };
  return <FlatList data={ITEMS} renderItem={createItems} numColumns={2} />;
};

const styles = StyleSheet.create({});

export default StoreScreen;
