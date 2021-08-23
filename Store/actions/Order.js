import Order from "../../Modal/OrderItem";

export const ORDER_ITEMS = "ORDER_ITEMS";
export const SET_ORDERS = "SET_ORDERS";
export const orderItems = (orderedItems, totalAmount) => {
  return async (dispatch, getState) => {
    try {
      const dateOfOrder = new Date();
      const response = await fetch(
        `https://my-store-573da-default-rtdb.firebaseio.com/orders/${
          getState().auth.userId
        }.json?auth=${getState().auth.token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderedItems,
            totalAmount,
            date: dateOfOrder.toISOString(),
          }),
        }
      );
      if (!response.ok) throw new Error("Err");
      const responseData = await response.json();

      dispatch({
        type: ORDER_ITEMS,
        id: responseData.name,
        date: dateOfOrder,
        orderInfo: {
          orderedProducts: orderedItems,
          totalAmount: totalAmount,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchOrdersHistory = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://my-store-573da-default-rtdb.firebaseio.com/orders/${
          getState().auth.userId
        }.json`
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      const previousOrders = [];
      for (const key in data) {
        const currentOrder = data[key];
        previousOrders.push(
          new Order(
            key,
            currentOrder.orderedItems,
            currentOrder.totalAmount,
            new Date(currentOrder.date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, history: previousOrders });
    } catch (err) {
      throw err;
    }
  };
};
