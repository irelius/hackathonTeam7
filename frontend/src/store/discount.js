import { csrfFetch } from "./csrf";

const LOAD_DISCOUNT = "/product/setDiscount"
const LOAD_DISCOUNTS = "/product/setDiscounts"
const ADD_DISCOUNT = "/product/addDiscount"
const EDIT_DISCOUNT = "/product/editDiscount"
const DELETE_DISCOUNT = "/product/deleteDiscount"
const CLEAR_DISCOUNT = "/product/clearDiscount"

export const loadDiscount = (discountAddress) => {
    return {
        type: LOAD_DISCOUNT,
        payload: discountAddress
    }
}

export const loadDiscounts = (discountAddresses) => {
    return {
        type: LOAD_DISCOUNTS,
        payload: discountAddresses
    }
}

//thunk action to get discount by id
export const loadOneDiscountThunk = (discountId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/discount/${discountId}`)
        if (res.ok) {
            const discount = await res.json()
            dispatch(loadDiscount(discount))
        } console.error('Failed to load specific discount:', res.status, res.statusText);
    } catch (err) {
        console.error('An error occurred while loading specific discount:', err);
    }
}

// thunk action to get all discounts
export const loadAllDiscountsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/discount/all`)
        if (res.ok) {
            const discounts = await res.json()
            dispatch(loadDiscounts(discounts))
        } else {
            console.error("Failed to load all discounts:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading all discounts:", err);
    }
}

export const addDiscount = (discountAddress) => {
    return {
        type: ADD_DISCOUNT,
        payload: discountAddress
    }
}

// thunk action to create a new discount
export const addDiscountThunk = (newDiscount) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/discount`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDiscount)
        })

        if (res.ok) {
            const discount = await res.json()
            dispatch(addDiscount(discount))
        } else {
            console.error("Failed to create a new discount:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while creating new discount:", err);
    }
}

export const editDiscount = (discountAddress) => {
    return {
        type: EDIT_DISCOUNT,
        payload: discountAddress
    }
}

// thunk aciton to edit a new discount
export const editDiscountThunk = (discountId, editDiscount) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/discount/${discountId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editDiscount)
        })

        if (res.ok) {
            const discount = await res.json()
            dispatch(editDiscount(discount))
        } else {
            console.error("Failed to edit discount:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while editing discount:", err);
    }
}

export const deleteDiscount = (discountAddress) => {
    return {
        type: DELETE_DISCOUNT,
        payload: discountAddress
    }
}

//thunk action to delete a discount
export const deleteDiscountThunk = (discountId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/discount/${discountId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteDiscount(discountId))
        } else {
            console.error('Failed to delete discount:', res.status, res.statusText);
        }

    } catch (err) {
        console.error(`An error occured while deleting discount:`, err)
    }
}

export const clearDiscount = () => {
    return {
        type: CLEAR_DISCOUNT
    }
}

const initialDiscount = {}

const discountReducer = (state = initialDiscount, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_DISCOUNT:
            return action.payload.data
        case LOAD_DISCOUNTS:
            const discountAddresses = {}

            if (!action.payload.data) {
                return discountAddresses
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                discountAddresses[curr.id] = curr
            }

            return discountAddresses
        case ADD_DISCOUNT:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_DISCOUNT:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_DISCOUNT:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_DISCOUNT:
            return initialDiscount
        default:
            return newState
    }
}

export default discountReducer
