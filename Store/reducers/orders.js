import { ORDER_ITEMS } from "../actions/Order";
import Order from "../../Modal/OrderItem";
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ITEMS:
      const orderedData = action.orderInfo;
      const date = new Date();
      const orderItem = new Order(
        date.toString(),
        orderedData.orderedProducts,
        orderedData.totalAmount,
        new Date()
      );

      return {
        orders: state.orders.concat(orderItem),
      };
  }
  return state;
};
