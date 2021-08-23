export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";

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

      dispatch({
        type: SIGN_UP,
        userId: data.localId,
        token: data.idToken,
        expires: data.expiresIn,
      });
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

      dispatch({
        type: LOG_IN,
        token: data.idToken,
        userId: data.localId,
        expires: data.expiresIn,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
