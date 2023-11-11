import { csrfFetch } from "./csrf";

const LOAD_USER = "/user/setUser"
const LOAD_USERS = "/user/setUsers"
const ADD_USER = "/user/addUser"
const EDIT_USER = "/user/editUser"
const DELETE_USER = "/user/deleteUser"
const CLEAR_USER = "/user/clearUser"


export const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        payload: users,
    }
}

export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

export const editUser = (user) => {
    return {
        type: EDIT_USER,
        payload: user
    }
}

export const deleteUser = (user) => {
    return {
        type: DELETE_USER,
        payload: user
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}


// thunk action for all users
export const loadAllUsersThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/users/all")
        if (res.ok) {
            const allUsers = await res.json()
            dispatch(loadUsers(allUsers))
        } else {
            console.error('Failed to load all users:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all users:', err);
    }
    return []
}



// thunk action for editing a user information
export const editUserThunk = (userId, userInfo) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/user/${userId}/info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInfo })
        })

        if (res.ok) {
            const updatedUser = await res.json()
            dispatch(editUser(updatedUser))
            return updatedUser
        } else {
            console.error('Failed to update user information:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while updating user ${userId} information:`, err)
    }
}

export const deleteUserThunk = (userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/user/${userId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteUser(userId))
        } else {
            console.error(`Failed to delete user ${userId}:`, res.status, res.statusText)
        }
    } catch (err) {
        console.error(`An error occured while deleting user ${userId}:`, err)
    }
}

const initialUser = {}

const userReducer = (state = initialUser, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_USER:
            return action.payload
        case LOAD_USERS:
            const user = {}

            if (!action.payload.data) {
                return user
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                user[curr.id] = curr
            }

            return user
        case ADD_USER:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_USER:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_USER:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_USER:
            return initialUser
        default:
            return newState;
    }
}

export default userReducer;
