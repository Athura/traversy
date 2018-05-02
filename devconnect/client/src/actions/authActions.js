import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User, action creator
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    // history.push comes from register
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
// token includes everything about a user
// we need to encode and decode so we use jwt-decode. This will extract user from the token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to localStorage
      const { token } = res.data;

      //set token to localstorage
      localStorage.setItem("jwtToken", token);

      // set token to auth header in utils
      setAuthToken(token);

      // Decode token to get user data, user data is stored in here sets issued at and expiration date
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');

    // Remove auth header for futuer requests, setting to false will delete the authtoken for futuer requests
    setAuthToken(false);

    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}
