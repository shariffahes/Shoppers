import Item from "../../Modal/Item";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://my-store-573da-default-rtdb.firebaseio.com/products/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Err");
      dispatch({ type: DELETE_PRODUCT, id: id });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, description, imageURL, price) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://my-store-573da-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, imageURL, price }),
        }
      );
      if (!response.ok) throw new Error("Err");
      const responseData = await response.json();
      const id = responseData["name"];
      dispatch({
        type: CREATE_PRODUCT,
        product: {
          title,
          id: id,
          description,
          imageURL,
          price,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateProduct = (id, title, description, imageURL, price) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://my-store-573da-default-rtdb.firebaseio.com/products/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, imageURL, price }),
        }
      );
      if (!response.ok) throw new Error("Err");
      dispatch({
        type: UPDATE_PRODUCT,
        product: {
          id,
          title,
          description,
          imageURL,
          price,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://my-store-573da-default-rtdb.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("Error occured");
      }
      const data = await response.json();
      const fetchedData = [];
      for (const key in data) {
        const item = data[key];
        fetchedData.push(
          new Item(
            key,
            "u1",
            item.title,
            item.price,
            item.imageURL,
            item.description
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: fetchedData,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
