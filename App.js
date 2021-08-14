import React from "react";
import { StyleSheet } from "react-native";
import StoreNavigator from "./Navigation/Navigation";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
  return <StoreNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
