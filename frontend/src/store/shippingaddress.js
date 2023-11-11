import { csrfFetch } from "./csrf";

const LOAD_SHIPPING = "/product/setShipping"
const LOAD_SHIPPINGS = "/product/setShippings"
const ADD_SHIPPING = "/product/addShipping"
const EDIT_SHIPPING = "/product/editShipping"
const DELETE_SHIPPING = "/product/deleteShipping"
const CLEAR_SHIPPING = "/product/clearShipping"

export const loadShipping = (shippingAddress) => {
    return {
        type: LOAD_SHIPPING,
        payload: shippingAddress
    }
}

export const loadShippings = (shippingAddresses) => {
    return {
        type: LOAD_SHIPPINGS,
        payload: shippingAddresses
    }
}


// //thunk action to get a shipping address by id
// export const loadOneShippingThunk = (shippingId) => async (dispatch) => {
//     try {
//         const res = await csrfFetch(`/api/shipping/${shippingId}`)
//         if (res.ok) {
//             const shippingAddress = await res.json()
//             dispatch(loadShipping(shippingAddress))
//         } else {
//             console.error('Failed to load specific shipping address:', res.status, res.statusText);
//         }
//     } catch (err) {
//         console.error('An error occurred while loading specific shipping address:', err);
//     }
// }

// thunk action to get all shipping addresses for a specific user
export const loadUserShippingsThunk = (userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/shipping/user/${userId}`)
        if (res.ok) {
            const shippingAddresses = await res.json()
            dispatch(loadShippings(shippingAddresses))
        } else {
            console.error("Failed to load user's shipping addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading user's shipping addresses:", err);
    }
}

// thunk action to get all shipping addresses for current user
export const loadCurrentShippingThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/shipping/current`)
        if (res.ok) {
            const shippingAddresses = await res.json()
            dispatch(loadShippings(shippingAddresses))
        } else {
            console.error("Failed to load user's shipping addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading user's shipping addresses:", err);
    }
}


export const loadAllShippingsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/shipping/all`)
        if (res.ok) {
            const shippingAddress = await res.json()
            dispatch(loadShippings(shippingAddress))
        } else {
            console.error("Failed to load all shipping addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading all shipping addresses:", err);
    }
}

export const addShipping = (shippingAddress) => {
    return {
        type: ADD_SHIPPING,
        payload: shippingAddress
    }
}

export const addShippingThunk = (newShipping) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/shipping`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newShipping)
        })

        if (res.ok) {
            const shipping = await res.json()
            dispatch(addShipping(shipping))
        } else {
            console.error('Failed to create a new shipping address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while creating new shipping address:', err);
    }
}

export const editShipping = (shippingAddress) => {
    return {
        type: EDIT_SHIPPING,
        payload: shippingAddress
    }
}

export const editShippingThunk = (shippingId, editShipping) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/shipping/${shippingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editShipping)
        })

        if (res.ok) {
            const shipping = await res.json()
            dispatch(editShipping(shipping))
        } else {
            console.error('Failed to edit shipping address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while editing shipping address:', err);
    }
}

export const deleteShipping = (shippingAddress) => {
    return {
        type: DELETE_SHIPPING,
        payload: shippingAddress
    }
}

export const deleteShippingThunk = (shippingId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/shipping/${shippingId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteShipping(shippingId))
        } else {
            console.error('Failed to delete shipping address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occured while deleting shipping address:`, err)
    }
}

export const clearShipping = () => {
    return {
        type: CLEAR_SHIPPING
    }
}


const initialShipping = {}

const shippingReducer = (state = initialShipping, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_SHIPPING:
            return action.payload.data
        case LOAD_SHIPPINGS:
            const shippingAddresses = {}

            if (!action.payload.data) {
                return shippingAddresses
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                shippingAddresses[curr.id] = curr
            }

            return shippingAddresses
        case ADD_SHIPPING:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_SHIPPING:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_SHIPPING:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_SHIPPING:
            return initialShipping
        default:
            return newState
    }
}

export default shippingReducer
