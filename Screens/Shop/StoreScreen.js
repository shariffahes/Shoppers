import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, ActivityIndicator, View } from "react-native";
import ItemView from "../../Components/ItemView";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../Components/CustomHeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";
import * as cartActions from "../../Store/actions/Cart";
import { fetchProducts } from "../../Store/actions/products";
import CustomText from "../../Components/CustomText";
import * as Failing from "../../Components/FailedAlert";

const StoreScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const [hasError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const navListen = props.navigation.addListener("focus", loadProducts);
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
    return navListen;
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then((_) => setIsLoading(false));
  }, [dispatch, loadProducts]);

  const loadProducts = useCallback(
    async (fromRefresh) => {
      setError(false);
      if (fromRefresh === true) setRefreshing(true);
      try {
        await dispatch(fetchProducts());
        if (fromRefresh === true) setRefreshing(false);
      } catch (err) {
        Failing.FailedAlert();
        setError(true);
      }
    },
    [dispatch]
  );

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
  if (hasError) return <Failing.FailedScreen onClick={loadProducts} />;

  if (isLoading)
    return (
      <View style={styles.mainIndicatorView}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.mainIndicatorView}>
        <CustomText style={{ fontFamily: "open-sans-bold" }}>
          No products yet. Maybe start adding some.
        </CustomText>
      </View>
    );
  }
  return (
    <FlatList
      data={products}
      renderItem={createItems}
      numColumns={2}
      onRefresh={() => {
        loadProducts(true);
      }}
      refreshing={isRefreshing}
    />
  );
};

const styles = StyleSheet.create({
  mainIndicatorView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StoreScreen;
