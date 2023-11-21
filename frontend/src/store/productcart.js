import { csrfFetch } from "./csrf";

const LOAD_PRODUCT_CART = "/product/setProductCart";
const LOAD_PRODUCT_CARTS = "/product/setProductCarts";
const ADD_PRODUCT_CART = "/product/addProductCart";
const EDIT_PRODUCT_CART = "/product/editProductCart";
const DELETE_PRODUCT_CART = "/product/deleteProductCart";
const CLEAR_PRODUCT_CART = "/product/clearProductCart";

export const loadProductCart = (productCart) => {
  return {
    type: LOAD_PRODUCT_CART,
    payload: productCart,
  };
};

export const loadProductCarts = (productCart) => {
  return {
    type: LOAD_PRODUCT_CARTS,
    payload: productCart,
  };
};

// thunk action for all product carts
export const loadAllProductCartsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/productcart/all");
    if (res.ok) {
      const allPCs = await res.json();
      dispatch(loadProductCarts(allPCs));
    } else {
      console.error(
        "Failed to load all productCart:",
        res.status,
        res.statusText
      );
    }
  } catch (err) {
    console.error("An error occurred while loading all productCart:", err);
  }
  return [];
};

// thunk action for current user
export const loadUserProductCartThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/productcart/current`);
    if (res.ok) {
      const productCart = await res.json();
      dispatch(loadProductCarts(productCart));
    } else {
      console.error(
        `Failed to load productCart of category {categoryId}:`,
        res.status,
        res.statusText
      );
    }
  } catch (err) {
    console.error(
      "An error occurred while loading productCart of category {categoryId}:",
      err
    );
  }
};

export const addProductCart = (productCart) => {
  return {
    type: ADD_PRODUCT_CART,
    payload: productCart,
  };
};

// thunk action to create a new product category based on product Id and a list of categories
export const addProductCartThunk =
  (productId, quantity) => async (dispatch, getState) => {
    const state = getState();
    const cartItems = Object.values(state.productCart);

    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (existingCartItem) {
      const newQuantity = existingCartItem.productQuantity + 1;
      dispatch(editProductCartThunk(existingCartItem.id, newQuantity));
    } else {
      try {
        const res = await csrfFetch(`/api/productcart/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity }),
        });

        if (res.ok) {
          const productCart = await res.json();
          dispatch(addProductCart(productCart));
          return productCart;
        } else {
          console.error(
            `Failed to create a new productCatgory for product ${productId}:`,
            res.status,
            res.statusText
          );
        }
      } catch (err) {
        console.error("An error occurred while creating new productCart:", err);
      }
    }
  };

export const editProductCart = (productCart) => {
  return {
    type: EDIT_PRODUCT_CART,
    payload: productCart,
  };
};

// thunk action to edit productCart
export const editProductCartThunk =
  (productCartId, quantity) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/productcart/${productCartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (res.ok) {
        const updatedPCQuantity = await res.json();
        dispatch(editProductCart(updatedPCQuantity));
      } else {
        console.error(
          `Failed to edit productCart ${productCartId} quantity:`,
          res.status,
          res.statusText
        );
      }
    } catch (err) {
      console.error(
        `An error occurred while productCart ${productCartId} quantity:`,
        err
      );
    }
  };

export const deleteProductCart = (productCart) => {
  return {
    type: DELETE_PRODUCT_CART,
    payload: productCart,
  };
};

// delete product category thunk
export const deleteProductCartThunk = (productCartId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/productcart/${productCartId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const productCart = await res.json();
      dispatch(deleteProductCart(productCart));
    } else {
      console.error(
        `Failed to delete productCart ${productCartId}:`,
        res.status,
        res.statusText
      );
    }
  } catch (err) {
    console.error(
      `An error occurred while deleting productCart ${productCartId}:`,
      err
    );
  }
};

export const clearProductCart = () => {
  return {
    type: CLEAR_PRODUCT_CART,
  };
};

const initialProduct = {};

const productCartReducer = (state = initialProduct, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_PRODUCT_CART:
      return action.payload.data;
    case LOAD_PRODUCT_CARTS:
      const productCart = {};

      if (!action.payload.data) {
        return productCart;
      }

      for (let i = 0; i < action.payload.data.length; i++) {
        let curr = action.payload.data[i];
        productCart[curr.id] = curr;
      }

      return productCart;
    case ADD_PRODUCT_CART:
      newState[action.payload.id] = action.payload.data;
      return newState;
    case EDIT_PRODUCT_CART:
      newState[action.payload.data.id] = action.payload.data;
      return newState;
    case DELETE_PRODUCT_CART:
      delete newState[action.payload.data.id];
      return newState;
    case CLEAR_PRODUCT_CART:
      return initialProduct;
    default:
      return newState;
  }
};

export default productCartReducer;
