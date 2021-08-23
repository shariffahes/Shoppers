import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../Constants/Colors";
import { useDispatch } from "react-redux";
import { setData } from "../Store/actions/auth";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const isTokenValid = async () => {
      const userData = await AsyncStorage.getItem("userData");
      console.log(userData);
      if (!userData) {
        props.navigation.replace("Authentication");
        return;
      }
      const parsedData = JSON.parse(userData);
      const { token, userId, expiresIn } = parsedData;
      const expirationDuration = new Date(expiresIn);
      if (expirationDuration <= new Date() || !token || !userId) {
        props.navigation.replace("Authentication");
        return;
      }
      const currDate = new Date();

      const expireTime = expirationDuration.getTime() - currDate.getTime();
      dispatch(setData(token, userId, expireTime));
    };
    isTokenValid();
  }, [dispatch]);
  return (
    <View style={styles.main}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default StartUpScreen;
