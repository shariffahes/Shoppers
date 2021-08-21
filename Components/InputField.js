import React, { useEffect, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CustomText from "./CustomText";

const INPUT_CHANGE = "INPUT_CHANGE";
const FOCUS_ENDED = "FOCUS_ENDED";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      console.log(state);

      return {
        ...state,
        value: action.value,
        validity: action.validity,
      };
    case FOCUS_ENDED:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputField = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    validity: props.initiallyValid,
    touched: props.initiallyValid,
  });

  const textChangeHandler = (text) => {
    let isValid = true;
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'/;
    const input = text.trim();
    if (props.required && input.length === 0) {
      isValid = false;
    } else if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    } else if (props.max && +text > props.max) {
      isValid = false;
    } else if (props.min && +text < props.min) {
      isValid = false;
    } else if (props.minLen && text.length > props.minLen) {
      isValid = false;
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      validity: isValid,
    });
  };

  useEffect(() => {
    props.inputChangeHandler(props.identifier, inputState);
  }, [inputState]);

  return (
    <View style={styles.form}>
      <CustomText style={styles.label}>{props.label}</CustomText>
      <TextInput
        {...props}
        value={inputState.value}
        style={styles.input}
        onChangeText={(input) => textChangeHandler(input)}
        onBlur={() => dispatch({ type: FOCUS_ENDED })}
      ></TextInput>
      {inputState.touched && !inputState.validity && (
        <CustomText style={{ color: "red" }}>{props.errorMsg}</CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
});

export default InputField;
