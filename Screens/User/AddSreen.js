import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../../Components/CustomHeaderButton";
import InputField from "../../Components/InputField";
import { createProduct, updateProduct } from "../../Store/actions/products";
import * as Failed from "../../Components/FailedAlert";
import Colors from "../../Constants/Colors";
const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.inputTrigger]: action.value,
    };
    const updatedValidity = {
      ...state.inputValidities,
      [action.inputTrigger]: action.validity,
    };
    let formValidity = true;
    for (const key in updatedValidity) {
      formValidity = formValidity && updatedValidity[key];
    }

    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidity,
      formIsValid: formValidity,
    };
  }
  return state;
};

const AddScreen = (props) => {
  const params = props.route.params;
  let editedProduct;
  if (params) {
    editedProduct = useSelector((state) =>
      state.products.userProducts.find((prod) => prod.id === params.prodId)
    );
  }

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      titleInput: editedProduct ? editedProduct.name : "",
      imageInput: editedProduct ? editedProduct.imageURL : "",
      descriptionInput: editedProduct ? editedProduct.description : "",
      priceInput: editedProduct ? editedProduct.price.toFixed(2) : "",
    },
    inputValidities: {
      titleInput: editedProduct ? true : false,
      imageInput: editedProduct ? true : false,
      priceInput: editedProduct ? true : false,
      descriptionInput: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: (options) => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            iconName="check"
            title="save"
            color={options.tintColor}
            iconSize={25}
            onPress={() => {
              if (!formState.formIsValid) return;

              submitHandler();
            }}
          />
        </HeaderButtons>
      ),
      title: params ? "Edit Product" : "Add Product",
    });
  }, [submitHandler, formState]);

  const submitHandler = useCallback(async () => {
    setLoading(true);

    const price = parseFloat(formState.inputValues.priceInput);
    try {
      if (editedProduct) {
        await dispatch(
          updateProduct(
            params.prodId,
            formState.inputValues.titleInput,
            formState.inputValues.descriptionInput,
            formState.inputValues.imageInput,
            price
          )
        );
      } else {
        await dispatch(
          createProduct(
            formState.inputValues.titleInput,
            formState.inputValues.descriptionInput,
            formState.inputValues.imageInput,
            price
          )
        );
      }
      setLoading(false);
      props.navigation.goBack();
    } catch (err) {
      Failed.FailedAlert();
      setLoading(false);
      throw new Error("Err");
    }
  }, [dispatch, formState, isLoading]);

  const inputChangeHandler = useCallback(
    (identifier, state) => {
      formDispatch({
        type: "FORM_INPUT_UPDATE",
        value: state.value,
        validity: state.validity,
        inputTrigger: identifier,
      });
    },
    [formDispatch]
  );

  if (isLoading)
    return (
      <View style={styles.mainIndicator}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  return (
    <ScrollView style={styles.scrollMain}>
      <View style={styles.main}>
        <InputField
          identifier="titleInput"
          required
          label="Title"
          errorMsg="Enter a valid title"
          autoCapitalize="sentences"
          inputChangeHandler={inputChangeHandler}
          initialValue={formState.inputValues.titleInput}
          initiallyValid={formState.inputValidities.titleInput}
        />
        <InputField
          identifier="imageInput"
          required
          label="Image URL"
          errorMsg="Enter a valid url"
          inputChangeHandler={inputChangeHandler}
          initialValue={formState.inputValues.imageInput}
          initiallyValid={formState.inputValidities.imageInput}
        />
        <InputField
          identifier="descriptionInput"
          required
          label="Description"
          errorMsg="Enter a valid description"
          multiline={true}
          numeberOfLines={3}
          inputChangeHandler={inputChangeHandler}
          initialValue={formState.inputValues.descriptionInput}
          initiallyValid={formState.inputValidities.descriptionInput}
        />
        <InputField
          identifier="priceInput"
          required
          label="Price"
          errorMsg="Invalid! make sure that the price is between $1 and $5000"
          keyboardType="decimal-pad"
          inputChangeHandler={inputChangeHandler}
          initialValue={formState.inputValues.priceInput}
          initiallyValid={formState.inputValidities.priceInput}
          min={1}
          max={5000}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollMain: {
    flex: 1,
    backgroundColor: "white",
  },
  main: { margin: 20 },
});

export default AddScreen;
