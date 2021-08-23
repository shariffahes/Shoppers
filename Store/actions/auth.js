import AsyncStorage from "@react-native-async-storage/async-storage";
export const SIGN_UP = "SIGN_UP";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOG_OUT = "LOG_OUT";
export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQCH9CkKTj41TafzOAiJJr0JPb6y4cj7A",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const res = errorResponse.error.message;
        let message = "Unknown Error";
        if (res === "EMAIL_EXISTS") {
          message = "This email is already registered. Sign in instead";
        }

        throw new Error(message);
      }
      const data = await response.json();

      dispatch(
        setData(data.idToken, data.localId, parseInt(data.expiresIn) * 1000)
      );
      const expirationDuration =
        new Date().getTime() + parseInt(data.expiresIn) * 1000;
      saveDataToStorage(data.idToken, data.localId, expirationDuration);
    } catch (error) {
      throw error;
    }
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQCH9CkKTj41TafzOAiJJr0JPb6y4cj7A",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const res = errorResponse.error.message;
        let message = "Unknown Error";
        if (res === "INVALID_EMAIL") {
          message =
            "This email is not registered. Check again or Sign up with this email";
        } else if (res === "INVALID_PASSWORD") {
          message = "The entered password is invalid.";
        }

        throw new Error(message);
      }
      const data = await response.json();

      dispatch(
        setData(data.idToken, data.localId, parseInt(data.expiresIn) * 1000)
      );
      const expirationDuration =
        new Date().getTime() + parseInt(data.expiresIn) * 1000;
      saveDataToStorage(data.idToken, data.localId, expirationDuration);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

const saveDataToStorage = (token, userId, expireDuration) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token: token, userId: userId, expiresIn: expireDuration })
  );
};

export const setData = (token, userId, expireTime) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
    dispatch(setLogOutTimer(expireTime));
  };
};

export const Logout = () => {
  AsyncStorage.removeItem("userData");
  clearAnyPrevTimer();
  return {
    type: LOG_OUT,
  };
};
let timer;
const clearAnyPrevTimer = () => {
  if (timer) clearTimeout(timer);
};
const setLogOutTimer = (expirationDuration) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(Logout());
    }, expirationDuration);
  };
};
