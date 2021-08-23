import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import StoreScreen from "../Screens/Shop/StoreScreen";
import CartScreen from "../Screens/Shop/CartScreen";
import DetailsScreen from "../Screens/Shop/ProductDetailsScreen";
import OrderScreen from "../Screens/Shop/OrdersScreen";
import MyProductsScreen from "../Screens/User/MyProductsScreen";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { Button, Platform } from "react-native";
import AddScreen from "../Screens/User/AddSreen";
import AuthenticationScreen from "../Screens/User/AuthScreen";
import { useDispatch, useSelector } from "react-redux";
import StartUpScreen from "../Screens/StartupScreen";
import { Logout } from "../Store/actions/auth";

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
  const authState = useSelector((state) => state.auth);

  const isAuthenticated = authState.token !== null;
  return (
    <StoreStack.Navigator screenOptions={setScreenHeaderColors}>
      {!isAuthenticated ? (
        <>
          <StoreStack.Screen name="My Shop" component={StartUpScreen} />
          <StoreStack.Screen
            name="Authentication"
            component={AuthenticationScreen}
          />
        </>
      ) : (
        <>
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
          <StoreStack.Screen name="The product" component={AddScreen} />
        </>
      )}
    </StoreStack.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log out"
        icon={({ color, size }) => (
          <Entypo name="log-out" size={size} color={color} />
        )}
        onPress={() => {
          dispatch(Logout());
        }}
      />
    </DrawerContentScrollView>
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
    <DrawerStack.Navigator
      screenOptions={setScreenHeaderColors}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
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
