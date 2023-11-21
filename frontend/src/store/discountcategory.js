import { csrfFetch } from "./csrf";

const LOAD_DISCOUNT_CATEGORY = "/discount/setDiscountCategory"
const LOAD_DISCOUNT_CATEGORIES = "/discount/setDiscountCategories"
const ADD_DISCOUNT_CATEGORY = "/discount/addDiscountCategory"
const EDIT_DISCOUNT_CATEGORY = "/discount/editDiscountCategory"
const DELETE_DISCOUNT_CATEGORY = "/discount/deleteDiscountCategory"
const CLEAR_DISCOUNT_CATEGORY = "/discount/clearDiscountCategory"


export const loadDiscountCategory = (discountCategory) => {
    return {
        type: LOAD_DISCOUNT_CATEGORY,
        payload: discountCategory
    }
}

export const loadDiscountCategories = (discountCategories) => {
    return {
        type: LOAD_DISCOUNT_CATEGORIES,
        payload: discountCategories,
    }
}

// thunk action for all discount categories
export const loadAllDiscountCategoriesThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/discountcategory/all")
        if (res.ok) {
            const allPCs = await res.json()
            dispatch(loadDiscountCategories(allPCs))
        } else {
            console.error('Failed to load all discountCategories:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all discountCategories:', err);
    }
    return []
}

export const addDiscountCategory = (discountCategory) => {
    return {
        type: ADD_DISCOUNT_CATEGORY,
        payload: discountCategory
    }
}

export const editDiscountCategory = (discountCategory) => {
    return {
        type: EDIT_DISCOUNT_CATEGORY,
        payload: discountCategory
    }
}

export const deleteDiscountCategory = (discountCategory) => {
    return {
        type: DELETE_DISCOUNT_CATEGORY,
        payload: discountCategory
    }
}


export const clearDiscountCategory = () => {
    return {
        type: CLEAR_DISCOUNT_CATEGORY
    }
}


const initialDiscount = {}

const discountCategoryReducer = (state = initialDiscount, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_DISCOUNT_CATEGORY:
            return action.payload.data
        case LOAD_DISCOUNT_CATEGORIES:
            const discountCategories = {}

            if (!action.payload.data) {
                return discountCategories
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                discountCategories[curr.id] = curr
            }

            return discountCategories
        case ADD_DISCOUNT_CATEGORY:
            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                newState[curr.id] = curr
            }
            return newState;
        case EDIT_DISCOUNT_CATEGORY:
            const newPCs = {}
            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                newPCs[curr.id] = curr
            }
            return newPCs;
        case DELETE_DISCOUNT_CATEGORY:
            delete newState[action.payload.data.id]
            return newState;
        case CLEAR_DISCOUNT_CATEGORY:
            return initialDiscount
        default:
            return newState;
    }
}

export default discountCategoryReducer
