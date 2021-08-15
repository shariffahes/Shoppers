import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import StoreScreen from "../Screens/Shop/StoreScreen";
import CartScreen from "../Screens/Shop/CartScreen";
import DetailsScreen from "../Screens/Shop/ProductDetailsScreen";
import OrderScreen from "../Screens/Shop/OrdersScreen";
import MyProductsScreen from "../Screens/User/MyProductsScreen";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { Platform } from "react-native";

const StoreStack = createNativeStackNavigator();

const DrawerStack = createDrawerNavigator();

const setScreenHeaderColors = () => ({
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },

  headerTintColor: Platform.OS === "android" ? Colors.accent : Colors.primary,
  drawerActiveTintColor: Colors.primary,
});
const setDetailsScreenOption = ({ route }) => ({
  headerTitle: route.params.title,
});

const StoreNavigation = () => {
  return (
    <StoreStack.Navigator screenOptions={setScreenHeaderColors}>
      <StoreStack.Screen
        name="My Store"
        component={DrawerNavigation}
        options={{
          headerShown: false,
        }}
      />
      <StoreStack.Screen name="My Cart" component={CartScreen} />
      <StoreStack.Screen
        name="Details"
        component={DetailsScreen}
        options={setDetailsScreenOption}
      />
    </StoreStack.Navigator>
  );
};

const DrawerNavigation = () => {
  const setStoreScreenOptions = () => {
    return {
      drawerIcon: (props) => (
        <Entypo name="shopping-bag" size={props.size} color={props.color} />
      ),
    };
  };
  return (
    <DrawerStack.Navigator screenOptions={setScreenHeaderColors}>
      <DrawerStack.Screen
        name="Store"
        component={StoreScreen}
        options={setStoreScreenOptions}
      />
      <DrawerStack.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          drawerIcon: (props) => (
            <FontAwesome name="history" size={props.size} color={props.color} />
          ),
        }}
      />
      <DrawerStack.Screen
        name="Manage Store"
        component={MyProductsScreen}
        options={{
          drawerIcon: (props) => (
            <Entypo name="shop" size={props.size} color={props.color} />
          ),
        }}
      />
    </DrawerStack.Navigator>
  );
};

const StoreNavigator = () => {
  return (
    <NavigationContainer>
      <StoreNavigation />
    </NavigationContainer>
  );
};

export default StoreNavigator;
