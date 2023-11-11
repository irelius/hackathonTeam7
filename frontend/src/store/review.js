import { csrfFetch } from "./csrf";

const LOAD_REVIEW = "/review/setReview"
const LOAD_REVIEWS = "/review/setReviews"
const ADD_REVIEW = "/review/addReview"
const EDIT_REVIEW = "/review/editReview"
const DELETE_REVIEW = "/review/deleteReview"
const CLEAR_REVIEW = "/review/clearReview"

export const loadReview = (review) => {
    return {
        type: LOAD_REVIEW,
        payload: review
    }
}

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews,
    }
}

export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review
    }
}

export const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        payload: review
    }
}

export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        payload: review
    }
}

export const clearReview = () => {
    return {
        type: CLEAR_REVIEW
    }
}

// thunk action for one specific review
export const loadOneReviewThunk = (reviewId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/review/${reviewId}`)
        if (res.ok) {
            const review = await res.json()
            dispatch(loadReview(review))
        } else {
            console.error('Failed to load specific review:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading specific review:', err);
    }
}

// thunk action for one user's reviews
export const loadUserReviewsThunk = (userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/review/user/${userId}`)
        if (res.ok) {
            const review = await res.json()
            dispatch(loadReviews(review))
        } else {
            console.error('Failed to load review:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading review:', err);
    }
}

// thunk action for all reviews
export const loadAllReviewsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/review/all")
        if (res.ok) {
            const allReviews = await res.json()
            dispatch(loadReviews(allReviews))
        } else {
            console.error('Failed to load all reviews:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all reviews:', err);
    }
    return []
}

// thunk action for creating a new review
export const addReviewThunk = (newReview) => async (dispatch) => {
    try {


        // Log the URL and data being sent
        console.log('Data:', newReview);



        const res = await csrfFetch(`/api/review/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview)
        })

        if (res.ok) {
            const review = await res.json()
            dispatch(addReview(review))
            return review;
        } else {
            console.error('Failed to create a new review:', res.status, res.statusText);
        }

    } catch (err) {
        console.error('An error occurred while creating new review:', err);
    }
}

// thunk action for editing a review information
export const editReviewThunk = (reviewId, reviewInfo) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/review/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reviewInfo })
        })

        if (res.ok) {
            const updatedReview = await res.json()
            dispatch(editReview(updatedReview))
            return updatedReview
        } else {
            console.error('Failed to update review information:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while updating review ${reviewId} information:`, err)
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/review/${reviewId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteReview(reviewId))
        } else {
            console.error(`Failed to delete review ${reviewId}:`, res.status, res.statusText)
        }
    } catch (err) {
        console.error(`An error occured while deleting review ${reviewId}:`, err)
    }
}

const initialReview = {}

const reviewReducer = (state = initialReview, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_REVIEW:
            return action.payload
        case LOAD_REVIEWS:
            const review = {}

            if (!action.payload.data) {
                return review
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                review[curr.id] = curr
            }

            return review
        case ADD_REVIEW:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_REVIEW:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_REVIEW:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_REVIEW:
            return initialReview
        default:
            return newState;
    }
}

export default reviewReducer;
