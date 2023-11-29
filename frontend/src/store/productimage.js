import { csrfFetch } from "./csrf";

const LOAD_PRODUCT_IMAGE = "/image/setProductImage";

const loadProductImage = (productImage) => ({
    type: LOAD_PRODUCT_IMAGE,
    payload: productImage
});

export const createImage = (image) => async (dispatch) => {
    const 
    const formData = new FormData();
    formData.append

    // if (images && images.length !== 0 ) {
    //     for (var 1 = 0; i <images.length; i++) {
    //         formData.append("images", images[i]);
    //     }
    // }

    // for single file 
    if (image) formData.append('image', image);

    const res = await csrfFetch(`/api/images`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    const data = await res.json();
    dispatch(loadProductImage(data.image));
}


const productImageReducer = (state = initialProduct, action) => {
    const newState = { ... state };
    switch (action.type) {
        case LOAD_PRODUCT_IMAGE:
            return { ...state, image: action.payload };
    }
}

export default productImageReducer;
