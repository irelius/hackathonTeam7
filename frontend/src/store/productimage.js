import { csrfFetch } from "./csrf";

const LOAD_PRODUCT_IMAGE = "/image/setProductImage";
const LOAD_PRODUCT_IMAGES = "/image/setProductImages";
const ADD_PRODUCT_IMAGE = "/image/addProductImage";
const EDIT_PRODUCT_IMAGE = "/image/editProductImage";
const DELETE_PRODUCT_IMAGE = "/image/deleteProductImage";
const CLEAR_PRODUCT_IMAGE = "/image/clearProductImage";

const loadProductImage = (productImage) => ({
    type: LOAD_PRODUCT_IMAGE,
    payload: productImage
});

const loadProductImages = (productImage) => ({
    type: LOAD_PRODUCT_IMAGES,
    payload: productImage
});

const addProductImage = (productImage) => ({
    type: ADD_PRODUCT_IMAGE,
    payload: productImage,
});

export const addProductImageThunk = (product) => async (dispatch) => {
    const { images } = product;
    const formData = new FormData();

    // for multiple files
    if (images && images.length !== 0 ) {
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
    }

    // for single file 
    // if (image) formData.append('image', image);

    try {
        const res = await csrfFetch(`/api/productimages/`, {
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
            console.error("Failed to upload images:", res.status, res.statusText);
            // Handle error as needed
        }
    } catch (error) {
        console.error("An error occurred while uploading images:", error);
        // Handle error as needed
    }
};


const initialImage = null; // Change from {} to null

const productImageReducer = (state = initialImage, action) => {
    switch (action.type) {
        case LOAD_PRODUCT_IMAGE:
            return action.payload.data;
        case LOAD_PRODUCT_IMAGES:
            return action.payload; // Assuming payload is an array of images
        case ADD_PRODUCT_IMAGE:
            return { ...state, [action.payload.id]: action.payload }; // Assuming payload is the product image itself
        default:
            return state;
    }
}

export default productImageReducer;
