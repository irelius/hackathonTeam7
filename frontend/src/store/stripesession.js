import { csrfFetch } from "./csrf";

const LOAD_STRIPE_SESSION = "stripeSession/addStripeSession"
const ADD_STRIPE_SESSION = "/stripeSession/addStripeSession"
const DELETE_STRIPE_SESSION = "/stripeSession/deleteStripeSession"
const CLEAR_STRIPE_SESSION = "/stripeSession/clearStripeSession"

export const loadStripeSession = (stripeSession) => {
    return {
        type: LOAD_STRIPE_SESSION,
        payload: stripeSession
    }
}

// thunk action to load stripe session by id
export const loadStripeSessionThunk = (stripeSessionId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/stripesession/${stripeSessionId}`)
        if (res.ok) {
            const stripeSession = await res.json()

            dispatch(loadStripeSession(stripeSession))
        } else {
            console.error('Failed to load specific stripe session:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading specific stripe session:', err);
    }
}


export const addStripeSession = (stripeSession) => {
    return {
        type: ADD_STRIPE_SESSION,
        payload: stripeSession
    }
}


// thunk action to create a stripe session
export const addStripeSessionThunk = (newStripeSession) => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/stripesession/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStripeSession)
        })

        if (res.ok) {
            const stripeSession = await res.json()
            dispatch(addStripeSession(stripeSession))
            return stripeSession
        } else {
            console.error('Failed to create a new stripe session:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while creating new stripe session:', err);
    }
}

export const deleteStripeSession = (stripeSession) => {
    return {
        type: DELETE_STRIPE_SESSION,
        payload: stripeSession
    }
}

// thunk action to delete a stripe session
export const deleteStripeSessionThunk = (stripeSessionId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/stripesession/${stripeSessionId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            const stripeSession = await res.json()
            dispatch(deleteStripeSession(stripeSession))
        } else {
            console.error(`Failed to delete stripeSession ${stripeSessionId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while deleting stripeSession ${stripeSessionId}:`, err);

    }
}

export const clearStripeSession = () => {
    return {
        type: CLEAR_STRIPE_SESSION
    }
}


const initialStripeSession = {}

const stripeSessionReducer = (state = initialStripeSession, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_STRIPE_SESSION:
            return action.payload.data
        case ADD_STRIPE_SESSION:
            newState[action.payload.data.id] = action.payload.data
            return newState;
        case DELETE_STRIPE_SESSION:
            delete newState[action.payload.data.id]
            return newState;
        case CLEAR_STRIPE_SESSION:
            return initialStripeSession
        default:
            return newState
    }
}

export default stripeSessionReducer
