import { csrfFetch } from "./csrf";

const LOAD_CATEGORY = "/category/setCategory"
const LOAD_CATEGORIES = "/category/setCategories"
const ADD_CATEGORY = "/category/addCategory"
const EDIT_CATEGORY = "/category/editCategory"
const DELETE_CATEGORY = "/category/deleteCategory"
const CLEAR_CATEGORY = "/category/clearCategory"


export const loadCategory = (category) => {
    return {
        type: LOAD_CATEGORY,
        payload: category
    }
}

export const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        payload: categories
    }
}


// thunk action to get all categories
export const loadAllCategoriesThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/category/all`)
        if(res.ok) {
            const categories = await res.json()
            dispatch(loadCategories(categories))
        } else {
            console.error("Failed to load all categories:", res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all categories:', err);
    }
}



const initialCategory = {}

const categoryReducer = (state = initialCategory, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_CATEGORY:
            return action.payload.data
        case LOAD_CATEGORIES:
            const categories = {}


            if (!action.payload.data) {
                return categories
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                categories[curr.id] = curr
            }

            return categories
        case ADD_CATEGORY:
            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                newState[curr.id] = curr
            }
            return newState;
        case EDIT_CATEGORY:
            const newPCs = {}
            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                newPCs[curr.id] = curr
            }
            return newPCs;
        case DELETE_CATEGORY:
            delete newState[action.payload.data.id]
            return newState;
        case CLEAR_CATEGORY:
            return initialCategory
        default:
            return newState;
    }
}

export default categoryReducer
