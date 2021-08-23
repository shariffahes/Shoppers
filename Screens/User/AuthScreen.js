import React, { useCallback, useReducer, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Platform,
  ActivityIndicator,
} from "react-native";
import InputField from "../../Components/InputField";
import Colors from "../../Constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../../Components/CustomText";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../../Store/actions/auth";
import * as Alert from "../../Components/FailedAlert";

const formReducer = (state, action) => {
  if (action.type == "Update") {
    const updatedValues = {
      ...state.values,
      [action.identifier]: action.value,
    };
    const updatedValidities = {
      ...state.validities,
      [action.identifier]: action.validity,
    };
    let formValidity = true;
    for (const key in updatedValidities) {
      formValidity = formValidity && updatedValidities[key];
    }
    return {
      ...state,
      values: updatedValues,
      validities: updatedValidities,
      formIsValid: formValidity,
    };
  }
  return state;
};

const AuthenticationScreen = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formState, formDispatch] = useReducer(formReducer, {
    values: {
      email: "",
      password: "",
    },
    validities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  const signUpHandler = () => {
    if (formState.formIsValid) {
      setLoading(true);

      dispatch(
        isSignUp
          ? signUp(formState.values.email, formState.values.password)
          : logIn(formState.values.email, formState.values.password)
      ).catch((error) => {
        console.log(error);
        setLoading(false);
        Alert.FailedAlert({
          title: "An Error has occured",
          content: error.toString(),
        });
      });
    }
  };
  const onTextChange = useCallback(
    (identifier, state) => {
      formDispatch({
        type: "Update",
        identifier: identifier,
        value: state.value,
        validity: state.validity,
      });
    },
    [formDispatch]
  );
  return (
    <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.formStyle}>
          <InputField
            required
            label="Email"
            identifier="email"
            errorMsg="Enter a valid email address"
            keyboardType="email-address"
            autoCapitalize="none"
            inputChangeHandler={onTextChange}
            initialValue=""
            initiallyValid={true}
          />
          <InputField
            required
            label="Password"
            identifier="password"
            errorMsg="Enter a valid password"
            secureTextEntry
            min={6}
            autoCapitalize="none"
            inputChangeHandler={onTextChange}
            initialValue=""
            initiallyValid={true}
          />
          <View style={styles.buttonContainer}>
            {!isLoading ? (
              <Button
                title={isSignUp ? "Sign up" : "Log in"}
                color={Colors.primary}
                onPress={signUpHandler}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>
          {Platform.OS == "ios" && (
            <CustomText style={{ textAlign: "center", fontSize: 18 }}>
              OR
            </CustomText>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignUp ? "Log in" : "Sign up"}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignUp((prevState) => !prevState);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  formStyle: {
    width: "85%",
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 12,
    elevation: 10,
  },
});

export default AuthenticationScreen;
