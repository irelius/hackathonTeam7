import { csrfFetch } from "./csrf";

const LOAD_CART = "/cart/setCart"
const ADD_CART = "/cart/addCart"
const EDIT_CART = "/cart/editCart"
const DELETE_CART = "/cart/deleteCart"
const CLEAR_CART = "/cart/clearCart"

export const loadCart = (cart) => {
    return {
        type: LOAD_CART,
        payload: cart
    }
}

export const loadUserCartThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/cart/current')
        if (res.ok) {
            const cart = await res.json()
            dispatch(loadCart(cart))
        } else {
            console.error("Failed to load user's cart:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading user's cart:", err);
    }
}


export const addCart = (newCart) => {
    return {
        type: ADD_CART,
        payload: newCart
    }
}

export const addUserCartThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (res.ok) {
            const newCart = await res.json()
            dispatch(addCart(newCart))
        } else {
            console.error('Failed to create a new user cart:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while creating new user cart:', err);
    }
}

export const deleteCart = (cartAddress) => {
    return {
        type: DELETE_CART,
        payload: cartAddress
    }
}

export const deleteCartThunk = (cartId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/cart/${cartId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteCart())
        } else {
            console.error('Failed to delete user cart:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occured while deleting user cart:`, err)
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}


const initialCart = {}

const cartReducer = (state = initialCart, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_CART:
            return action.payload.data
        case ADD_CART:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_CART:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_CART:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_CART:
            return initialCart
        default:
            return newState
    }
}

export default cartReducer
