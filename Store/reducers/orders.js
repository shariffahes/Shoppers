import { ORDER_ITEMS, SET_ORDERS } from "../actions/Order";
import Order from "../../Modal/OrderItem";
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.history,
      };
    case ORDER_ITEMS:
      const orderedData = action.orderInfo;

      const orderItem = new Order(
        action.id,
        orderedData.orderedProducts,
        orderedData.totalAmount,
        orderedData.date
      );

      return {
        orders: state.orders.concat(orderItem),
      };
  }
  return state;
};
