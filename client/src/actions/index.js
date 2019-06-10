import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3300/api/`
});

export const REGISTER = "REGISTER";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const registerUser = newUser => dispatch => {
  api
    .post("register", newUser)
    .then(res => {
      dispatch({ type: REGISTER, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAIL, payload: err });
    });
};

export const LOGIN = "LOGIN";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const loginUser = credentials => dispatch => {
  api
    .post("login", credentials)
    .then(res => {
      dispatch({ type: LOGIN, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};
