import { LOG_IN, SIGN_UP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  expiresIn: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        userId: action.userId,
        token: action.token,
        expiresIn: action.expires,
      };
    case LOG_IN:
      return {
        userId: action.userId,
        token: action.token,
        expiresIn: action.expires,
      };
    default:
      return state;
  }
};
