import CartItem from "../../Modal/CartItem";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/Cart";
import { ORDER_ITEMS } from "../actions/Order";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const prod = action.product;
      const id = prod.id;
      const price = prod.price;
      const title = prod.name;
      let cartItem;

      if (state.items[id]) {
        const q = state.items[id].quantity + 1;
        const sum = state.items[id].sum + price;
        cartItem = new CartItem(title, q, price, sum);
      } else {
        cartItem = new CartItem(title, 1, price, price);
      }

      return {
        items: {
          ...state.items,
          [id]: cartItem,
        },
        totalAmount: state.totalAmount + price,
      };

    case REMOVE_FROM_CART:
      let updatedCart = {};
      const currQuantity = state.items[action.id].quantity;

      if (currQuantity > 1) {
        const prevItem = state.items[action.id];
        const updatedItem = new CartItem(
          prevItem.productTitle,
          prevItem.quantity - 1,
          prevItem.productPrice,
          prevItem.sum - prevItem.productPrice
        );
        updatedCart = { ...state.items, [action.id]: updatedItem };
      } else {
        updatedCart = { ...state.items };
        delete updatedCart[action.id];
      }

      return {
        ...state,
        items: updatedCart,
        totalAmount: state.totalAmount - state.items[action.id].productPrice,
      };
    case ORDER_ITEMS:
      return initialState;
    case DELETE_PRODUCT:
      if (state.items[action.id]) {
        const updatedItems = { ...state.items };
        const price = state.items[action.id].sum;
        delete updatedItems[action.id];
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - price,
        };
      }
  }
  return state;
};
