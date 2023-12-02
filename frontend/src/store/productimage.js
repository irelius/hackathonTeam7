import { csrfFetch } from "./csrf";

const LOAD_PRODUCT_IMAGE = "/image/setProductImage";
const LOAD_PRODUCT_IMAGES = "/image/setProductImages";
const ADD_PRODUCT_IMAGE = "/image/addProductImage";
const EDIT_PRODUCT_IMAGE = "/image/editProductImage";
const DELETE_PRODUCT_IMAGE = "/image/deleteProductImage";
const CLEAR_PRODUCT_IMAGE = "/image/clearProductImage";

const loadProductImage = (productImage) => ({
  type: LOAD_PRODUCT_IMAGE,
  payload: productImage,
});

const loadProductImages = (productImages) => ({
  type: LOAD_PRODUCT_IMAGES,
  payload: productImages,
});

const addProductImage = (productImage) => ({
  type: ADD_PRODUCT_IMAGE,
  payload: productImage,
});

// thunk action for one specific image
export const loadOneProductImageThunk = (productId) => async (dispatch) => {
  try {
      const res = await csrfFetch(`/api/productimages/product/${productId}`)
      if (res.ok) {
          const image = await res.json()
          dispatch(loadProductImage(image))
      } else {
          console.error('Failed to load specific product image:', res.status, res.statusText);
      }
  } catch (err) {
      console.error('An error occurred while loading specific product image:', err);
  }
}


// thunk action for all product images
export const loadAllProductImagesThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/productimages/all");
    if (res.ok) {
      const allPIs = await res.json();
      dispatch(loadProductImages(allPIs));
    } else {
      console.error(
        "Failed to load all productCart:",
        res.status,
        res.statusText
      )
    }
  } catch (err) {
    console.error("An error occurred while loading all productCart:", err);
  }
  return [];
}


export const addProductImageThunk = (productId, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append("productId", productId);
  if (image) formData.append("image", image);

  try {
    const res = await csrfFetch(`/api/productimages/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addProductImage(data.image));
    } else {
      console.error("Failed to upload image:", res.status, res.statusText);
      // Handle error as needed
    }
  } catch (error) {
    console.error("An error occurred while uploading image:", error);
    // Handle error as needed
  }
};


const initialState = {};

const productImageReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case LOAD_PRODUCT_IMAGE:
      return action.payload.data;
    case LOAD_PRODUCT_IMAGES:
      const productImages = {};

      if (!action.payload.data) {
        return productImages;
      }

      for (let i = 0; i < action.payload.data.length; i++) {
        let curr = action.payload.data[i];
        productImages[curr.id] = curr;
      }

      return productImages;
    case ADD_PRODUCT_IMAGE:
      return { ...state, image: action.payload }; // Assuming payload is the product image itself
    default:
      return newState;
  }
};


export default productImageReducer;
