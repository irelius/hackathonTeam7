import { csrfFetch } from "./csrf";

const LOAD_ORDER = "/order/setOrder"
const LOAD_ORDERS = "/order/setOrders"
const ADD_ORDER = "/order/addOrder"
const DELETE_ORDER = "/order/deleteOrder"
const CLEAR_ORDER = "/order/clearOrder"

export const loadOrder = (order) => {
    return {
        type: LOAD_ORDER,
        payload: order
    }
}

export const loadOrders = (orders) => {
    return {
        type: LOAD_ORDERS,
        payload: orders,
    }
}

// thunk action for one specific order
export const loadOneOrderThunk = (orderId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/order/${orderId}`)
        if (res.ok) {
            const order = await res.json()
            dispatch(loadOrders(order))
        } else {
            console.error('Failed to load specific order:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading specific order:', err);
    }
}

// thunk action for all orders
export const loadAllOrdersThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/order/all")
        if (res.ok) {
            const allOrders = await res.json()
            dispatch(loadOrders(allOrders))
        } else {
            console.error('Failed to load all orders:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all orders:', err);
    }
}

// thunk action for all orders grouped by cart ID
export const loadAllOrdersByCartThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/order/by-cart')
        if (res.ok) {
            const orders = await res.json()
            dispatch(loadOrder(orders))
        } else {
            console.error("Failed to load all orders:", res.status, res.statusText)
        }
    } catch (err) {
        console.error('An error occurred while loading all orders:', err);
    }
}

// thunk action for one current user's orders
export const loadCurrentUserOrdersThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/order/current`)
        if (res.ok) {
            const order = await res.json()
            dispatch(loadOrder(order))
        } else {
            console.error('Failed to load order:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading order:', err);
    }
}

// thunk action for order based on date
export const loadDateOrderThunk = (date) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/order/date/${date}`)
        if (res.ok) {
            const order = await res.json()
            dispatch(loadOrders(order))
        } else {
            console.error('Failed to load order:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading order:', err);
    }
}

export const addOrder = (order) => {
    return {
        type: ADD_ORDER,
        payload: order
    }
}


// thunk action for creating a new order
export const addOrderThunk = (newOrder) => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newOrder)
        })

        if (res.ok) {
            const order = await res.json()
            dispatch(addOrder(order))
            return order
        } else {
            console.error('Failed to create a new order:', res.status, res.statusText);
        }

    } catch (err) {
        console.error('An error occurred while creating new order:', err);
    }
}


export const deleteOrder = (order) => {
    return {
        type: DELETE_ORDER,
        payload: order
    }
}


export const deleteOrderThunk = (orderId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/order/${orderId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteOrder(orderId))
        } else {
            console.error(`Failed to delete order ${orderId}:`, res.status, res.statusText)
        }
    } catch (err) {
        console.error(`An error occured while deleting order ${orderId}:`, err)
    }
}

export const clearOrder = () => {
    return {
        type: CLEAR_ORDER
    }
}

const initialOrder = {}

const orderReducer = (state = initialOrder, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_ORDER:
            return action.payload.data
        case LOAD_ORDERS:
            const order = {}

            if (!action.payload.data) {
                return order
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                order[curr.id] = curr
            }

            return order
        case ADD_ORDER:
            newState[action.payload.data.id] = action.payload.data
            return newState;
        case DELETE_ORDER:
            delete newState[action.payload]
            return newState;
        case CLEAR_ORDER:
            return initialOrder
        default:
            return newState;
    }
}

export default orderReducer;
