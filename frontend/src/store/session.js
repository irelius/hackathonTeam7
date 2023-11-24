
import { csrfFetch } from "./csrf";

const SET_SESSION = "session/setSession";
const REMOVE_SESSION = "session/removeSession";
const CLEAR_SESSION = "session/clearSession"

const setSession = (session) => {
  return {
    type: SET_SESSION,
    payload: session,
  };
};

const removeSession = () => {
  return {
    type: REMOVE_SESSION,
  };
};

export const clearSession = () => {
  return {
    type: CLEAR_SESSION
  }
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSession(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setSession(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSession(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeSession());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SESSION:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_SESSION:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
