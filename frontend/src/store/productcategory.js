import { csrfFetch } from "./csrf";

const LOAD_PRODUCT_CATEGORY = "/product/setProductCategory"
const LOAD_PRODUCT_CATEGORIES = "/product/setProductCategories"
const ADD_PRODUCT_CATEGORY = "/product/addProductCategory"
const EDIT_PRODUCT_CATEGORY = "/product/editProductCategory"
const DELETE_PRODUCT_CATEGORY = "/product/deleteProductCategory"
const CLEAR_PRODUCT_CATEGORY = "/product/clearProductCategory"

export const loadProductCategory = (productCategory) => {
    return {
        type: LOAD_PRODUCT_CATEGORY,
        payload: productCategory
    }
}

export const loadProductCategories = (productCategories) => {
    return {
        type: LOAD_PRODUCT_CATEGORIES,
        payload: productCategories,
    }
}

// thunk action for all product categories
export const loadAllProductCategoryThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/productcategory/all")
        if (res.ok) {
            const allPCs = await res.json()
            dispatch(loadProductCategories(allPCs))
        } else {
            console.error('Failed to load all productCategories:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all productCategories:', err);
    }
    return []
}

// thunk action for all PCs of a category ID
export const loadProductCategoryByCategoryThunk = (categoryId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/category/${categoryId}`)
        if (res.ok) {
            const productCategories = await res.json()
            dispatch(loadProductCategories(productCategories))
        } else {
            console.error(`Failed to load productCategories of category {categoryId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while loading productCategories of categpory ${categoryId}:`, err);
    }
}

// thunk action for all PCs of a product ID
export const loadProductCategoryByProductThunk = (productId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/product/${productId}`)
        if (res.ok) {
            const productCategories = await res.json()
            dispatch(loadProductCategories(productCategories))
        } else {
            console.error(`Failed to load productCategories of product ${productId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while loading productCategories of product ${productId}:`, err);
    }
}

export const addProductCategory = (productCategory) => {
    return {
        type: ADD_PRODUCT_CATEGORY,
        payload: productCategory
    }
}

// thunk action to create a new product category based on product Id and a list of categories
export const addProductCategoryThunk = (productId, categoryArr) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, categoryArr })
        })

        if (res.ok) {
            const productCategory = await res.json()
            dispatch(addProductCategory(productCategory))
            return productCategory
        } else {
            console.error(`Failed to create a new productCatgory for product ${productId}:`, res.status, res.statusText);
        }

    } catch (err) {
        console.error('An error occurred while creating new productCategory:', err);
    }
}


export const editProductCategory = (productCategory) => {
    return {
        type: EDIT_PRODUCT_CATEGORY,
        payload: productCategory
    }
}


// thunk action to edit productCategories
export const editProductCategoryThunk = (productId, categoryArr) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryArr }),
        });

        if (res.ok) {
            const newProductCateogry = await res.json()
            dispatch(editProductCategory(newProductCateogry))
            return newProductCateogry
        } else {
            console.error(`Failed to edit productCategories of product ${productId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while editing new productCategory:', err);
    }
}


export const deleteProductCategory = (productCategory) => {
    return {
        type: DELETE_PRODUCT_CATEGORY,
        payload: productCategory
    }
}

// delete product category thunk
export const deleteProductCategoryThunk = (productCategoryId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/${productCategoryId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            const productCategory = await res.json()
            dispatch(deleteProductCategory(productCategory))
        } else {
            console.error(`Failed to delete productCategory ${productCategoryId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while deleting productCategory ${productCategoryId}:`, err);
    }
}

export const clearProductCategory = () => {
    return {
        type: CLEAR_PRODUCT_CATEGORY
    }
}


const initialProduct = {}

const productCategoryReducer = (state = initialProduct, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_PRODUCT_CATEGORY:
            return action.payload.data
        case LOAD_PRODUCT_CATEGORIES:
            const productCategories = {}

            if (!action.payload.data) {
                return productCategories
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                productCategories[curr.id] = curr
            }

            return productCategories
        case ADD_PRODUCT_CATEGORY:
            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                newState[curr.id] = curr
            }
            return newState;
        case EDIT_PRODUCT_CATEGORY:
            const newPCs = {}
            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                newPCs[curr.id] = curr
            }
            return newPCs;
        case DELETE_PRODUCT_CATEGORY:
            delete newState[action.payload.data.id]
            return newState;
        case CLEAR_PRODUCT_CATEGORY:
            return initialProduct
        default:
            return newState;
    }
}

export default productCategoryReducer
