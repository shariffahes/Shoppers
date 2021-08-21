import React from "react";
import { StyleSheet } from "react-native";
import StoreNavigator from "./Navigation/Navigation";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import productReducer from "./Store/reducers/product";
import cartReducer from "./Store/reducers/cart";
import { useFonts } from "expo-font";
import orderReducer from "./Store/reducers/orders";
import ReduxThunk from "redux-thunk";

enableScreens();
const rooteReducer = combineReducers({
  products: productReducer,
  carts: cartReducer,
  orders: orderReducer,
});
const store = createStore(rooteReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [isFontLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!isFontLoaded) return null;

  return (
    <Provider store={store}>
      <StoreNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
