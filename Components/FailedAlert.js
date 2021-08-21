import React from "react";
import { View, Alert, StyleSheet, Button } from "react-native";
import CustomText from "./CustomText";

export const FailedAlert = () => {
  return Alert.alert(
    " Unknown Error has occured",
    "There was an error connecting to server. Maybe try again later",
    [
      {
        text: "Dismiss",
        style: "default",
      },
    ]
  );
};

export const FailedScreen = (props) => {
  return (
    <View style={styles.mainIndicatorView}>
      <CustomText>An Error has occured :( </CustomText>
      {props.onClick && <Button title="Try again" onPress={props.onClick} />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainIndicatorView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
