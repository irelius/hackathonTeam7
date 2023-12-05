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
export const loadAllDiscountCategoryThunk = () => async (dispatch) => {
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

// thunk action for the discount categories of a specific discount
export const loadDiscountCategoryByDiscountThunk = (discountId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/discountcategory/discount/${discountId}`)
        if (res.ok) {
            const discountCategories = await res.json()
            dispatch(loadDiscountCategories(discountCategories))
        } else {
            console.error(`Failed to load discountCategories of discount ${discountId}:`, res.status, res.statusText);

        }
    } catch (err) {
        console.error(`An error occured while loading discountCategories of discount ${discountId}`)
    }
}

export const addDiscountCategory = (discountCategory) => {
    return {
        type: ADD_DISCOUNT_CATEGORY,
        payload: discountCategory
    }
}

// thunk action to create a new discount category based on discount Id and a list of categories
export const addDiscountCategoryThunk = (discountId, categoryArr) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/discountcategory/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ discountId, categoryArr })
        })

        if (res.ok) {
            const discountCategory = await res.json()
            dispatch(addDiscountCategory(discountCategory))
            return discountCategory
        } else {
            console.error(`Failed to create a new discountCatgory for discount ${discountId}:`, res.status, res.statusText);
        }

    } catch (err) {
        console.error('An error occurred while creating new discountCategory:', err);
    }
}


export const editDiscountCategory = (discountCategory) => {
    return {
        type: EDIT_DISCOUNT_CATEGORY,
        payload: discountCategory
    }
}

// thunk action to edit discountCategories
export const editDiscountCategoryThunk = (discountId, categoryArr) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/discountcategory/${discountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryArr }),
        });

        if (res.ok) {
            const newDiscountCateogry = await res.json()
            dispatch(editDiscountCategory(newDiscountCateogry))
            return newDiscountCateogry
        } else {
            console.error(`Failed to edit discountCategories of discount ${discountId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while editing new discountCategory:', err);
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
