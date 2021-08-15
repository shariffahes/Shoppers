import { ITEMS } from "../../Modal/Data/dummy";
import Item from "../../Modal/Item";

const initialState = {
  availableProducts: ITEMS,
  userProducts: ITEMS.filter((prod) => prod.ownerId === "u1"),
  favProducts: [],
};

export default (state = initialState, action) => {
  return state;
};
