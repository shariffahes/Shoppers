import { AUTHENTICATE, LOG_OUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userId: action.userId,
        token: action.token,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
