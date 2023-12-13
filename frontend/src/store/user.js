import { csrfFetch } from "./csrf";

const LOAD_USER = "/users/setUser"
const LOAD_USERS = "/users/setUsers"
const ADD_USER = "/users/addUser"
const EDIT_USER = "/users/editUser"
const DELETE_USER = "/users/deleteUser"
const CLEAR_USER = "/users/clearUser"


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

// thunk action for loading employee users
export const loadAllEmployeesThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/users/employees")
        if (res.ok) {
            const allUsers = await res.json()
            dispatch(loadUsers(allUsers))
        } else {
            console.error('Failed to load all users:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all employees:', err);
    }
}



// thunk action for editing a user information
export const editUserThunk = (userId, userInfo) => async (dispatch) => {
    console.log('booba', userInfo)

    try {
        const res = await csrfFetch(`/api/users/${userId}/info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        });

        if (res.ok) {
            const updatedUser = await res.json();

            console.log('booba', updatedUser);

            dispatch(editUser(updatedUser));
            return updatedUser;
        } else {
            console.error('Failed to update user information:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while updating user ${userId} information:`, err);
    }
};

// thunk action to create a new user
export const addUserThunk = (newUser) => async (dispatch) => {

    try {
        const res = await csrfFetch(`/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        })

        if (res.ok) {
            const user = await res.json()
            dispatch(addUser(user))
            return user
        } else {
            console.error('Failed to create a new user:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while creating a new user:`, err)
    }
}


// thunk action to create a new employee
export const addEmployeeThunk = (newEmployee) => async (dispatch) => {

    try {
        const res = await csrfFetch(`/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee)
        })

        if (res.ok) {
            const employee = await res.json()
            dispatch(addUser(employee))
            return employee
        } else {
            console.error('Failed to create a new employee:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while creating a new employee:`, err)
    }
}

export const deleteUserThunk = (userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/users/${userId}`, {
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

export const deleteEmployeeThunk = (employeeId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/users/employee/${employeeId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteUser(employeeId))
        } else {
            console.error(`Failed to delete employee ${employeeId}:`, res.status, res.statusText)
        }
    } catch (err) {
        console.error(`An error occured while deleting employee ${employeeId}:`, err)
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
            // console.log('booba', action.payload.data)

            newState[action.payload.data.id] = action.payload.data;
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
