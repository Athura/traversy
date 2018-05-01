import { GET_ERRORS } from "./types";
import axios from "axios";

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
