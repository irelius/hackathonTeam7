import { csrfFetch } from "./csrf";

const LOAD_ADDRESS = "/product/setAddress"
const LOAD_ADDRESSES = "/product/setAddresses"
const ADD_ADDRESS = "/product/addAddress"
const EDIT_ADDRESS = "/product/editAddress"
const DELETE_ADDRESS = "/product/deleteAddress"
const CLEAR_ADDRESS = "/product/clearAddress"

export const loadAddress = (address) => {
    return {
        type: LOAD_ADDRESS,
        payload: address
    }
}

export const loadAddresses = (addresses) => {
    return {
        type: LOAD_ADDRESSES,
        payload: addresses
    }
}


// thunk action to load an address by id. doesn't seem like this thunk is necessary
export const loadOneAddressThunk = (addressId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/${addressId}`)
        if (res.ok) {
            const address = await res.json()
            dispatch(loadAddress(address))
        } else {
            console.error('Failed to load specific address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading specific address:', err);
    }
}


// thunk action to get all billing addresses belonging to a user
export const loadUserBillingThunk = (userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/billing/user/${userId}`)
        if (res.ok) {
            const addresses = await res.json()
            dispatch(loadAddresses(addresses))
        } else {
            console.error("Failed to load user's billing addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading user's billing addresses:", err);
    }
}

// thunk action to get all billing addresses belonging to a CURRENT user
export const loadCurrentBillingThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/billing/user/current`)
        if (res.ok) {
            const addresses = await res.json()

            dispatch(loadAddresses(addresses))
        } else {
            console.error("Failed to load current user's billing addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading current user's billing addresses:", err);
    }
}


// thunk action to get all shipping addresses belonging to a user
export const loadUserShippingThunk = (userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/shipping/user/${userId}`)
        if (res.ok) {
            const addresses = await res.json()
            dispatch(loadAddresses(addresses))
        } else {
            console.error("Failed to load user's shipping addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading user's shipping addresses:", err);
    }
}


// thunk action to get all shipping addresses belonging to a user
export const loadCurrentShippingThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/shipping/user/current`)
        if (res.ok) {
            const addresses = await res.json()
            dispatch(loadAddresses(addresses))
        } else {
            console.error("Failed to load current user's shipping addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading current user's shipping addresses:", err);
    }
}

// thunk action to get all addresses
export const loadAllAddressesThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/all`)
        if (res.ok) {
            const address = await res.json()
            dispatch(loadAddresses(address))
        } else {
            console.error("Failed to load all addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading all addresses:", err);
    }
}

// thunk action to get all billing addresses
export const loadAllBillingThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/billing/all`)
        if (res.ok) {
            const address = await res.json()
            dispatch(loadAddresses(address))
        } else {
            console.error("Failed to load all billing addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading all billing addresses:", err);
    }
}

// thunk action to get all shipping addresses
export const loadAllShippingThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/shipping/all`)
        if (res.ok) {
            const address = await res.json()
            dispatch(loadAddresses(address))
        } else {
            console.error("Failed to load all shipping addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading all shipping addresses:", err);
    }
}

export const addAddress = (address) => {
    return {
        type: ADD_ADDRESS,
        payload: address
    }
}

export const addAddressThunk = (newAddress) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAddress)
        })

        if (res.ok) {
            const address = await res.json()
            dispatch(addAddress(address))
        } else {
            console.error('Failed to create a new address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while creating new address:', err);
    }
}

export const editAddress = (address) => {
    return {
        type: EDIT_ADDRESS,
        payload: address
    }
}

export const editAddressThunk = (addressId, editAddress) => async (dispatch) => {

    try {
        const res = await csrfFetch(`/api/address/${addressId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editAddress)
        })

        if (res.ok) {
            const address = await res.json()
            dispatch(editAddress(address))
        } else {
            console.error('Failed to edit address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while editing address:', err);
    }
}

export const deleteAddress = (address) => {
    return {
        type: DELETE_ADDRESS,
        payload: address
    }
}

export const deleteAddressThunk = (addressId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/address/${addressId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteAddress(addressId))
        } else {
            console.error('Failed to delete address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occured while deleting address:`, err)
    }
}

export const clearAddress = () => {
    return {
        type: CLEAR_ADDRESS
    }
}


const initialAddress = {}

const addressReducer = (state = initialAddress, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_ADDRESS:
            return action.payload.data
        case LOAD_ADDRESSES:
            const addresses = {}

            if (!action.payload.data) {
                return addresses
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                addresses[curr.id] = curr
            }

            return addresses
        case ADD_ADDRESS:
            newState[action.payload.data.id] = action.payload.data
            return newState;
        case EDIT_ADDRESS:
            newState[action.payload.data.id] = action.payload.data;
            return newState;
        case DELETE_ADDRESS:
            delete newState[action.payload]
            return newState;
        case CLEAR_ADDRESS:
            return initialAddress
        default:
            return newState
    }
}

export default addressReducer
