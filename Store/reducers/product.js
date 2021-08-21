import Item from "../../Modal/Item";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
  favProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === "u1"),
        favProducts: [],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.id
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.id
        ),
      };
    case UPDATE_PRODUCT:
      const prodInfo = action.product;
      const indexInAvailable = state.availableProducts.findIndex(
        (prod) => prod.id === prodInfo.id
      );
      const updatedProduct = new Item(
        prodInfo.id,
        state.availableProducts[indexInAvailable].ownerId,
        prodInfo.title,
        prodInfo.price,
        prodInfo.imageURL,
        prodInfo.description
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[indexInAvailable] = updatedProduct;
      const indexInUser = state.userProducts.findIndex(
        (prod) => prod.id === prodInfo.id
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[indexInUser] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };

    case CREATE_PRODUCT:
      const info = action.product;
      const newProduct = new Item(
        info.id,
        "u1",
        info.title,
        info.price,
        info.imageURL,
        info.description
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
  }
  return state;
};
