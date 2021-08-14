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

const StoreStack = createNativeStackNavigator();

const DrawerStack = createDrawerNavigator();

const StoreNavigation = () => {
  return (
    <StoreStack.Navigator>
      <StoreStack.Screen
        name="My Store"
        component={DrawerNavigation}
        options={{
          headerShown: false,
        }}
      />
      <StoreStack.Screen name="My Cart" component={CartScreen} />
      <StoreStack.Screen name="Details" component={DetailsScreen} />
    </StoreStack.Navigator>
  );
};

const DrawerNavigation = () => {
  const setStoreScreenOptions = ({ navigation, route }) => {
    return {
      drawerIcon: (props) => (
        <Entypo name="shopping-bag" size={props.size} color={props.color} />
      ),
    };
  };
  return (
    <DrawerStack.Navigator>
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
