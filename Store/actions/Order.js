export const ORDER_ITEMS = "ORDER_ITEMS";

export const orderItems = (orderedItems, totalAmount) => {
  return {
    type: ORDER_ITEMS,
    orderInfo: {
      orderedProducts: orderedItems,
      totalAmount: totalAmount,
    },
  };
};
