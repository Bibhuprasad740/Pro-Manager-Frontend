import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Apis from "../backend_apis";
import history from "../history";
import { redirect } from "react-router-dom";

const initialUser = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const authStatus = localStorage.getItem("auth") ? true : false;

const initialState = {
  isLoading: false,
  isAuthenticated: authStatus,
  currentUser: initialUser,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    registerSuccess(state, action) {
      state.currentUser = action.payload.user;
      state.isLoading = false;
      state.error = null;
    },
    registerFailure(state, action) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = action.payload.error;
    },
    loginSuccess(state, action) {
      state.currentUser = action.payload.user;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = action.payload.error;
    },
    logoutSuccess(state, actoin) {
      state.currentUser = null;
      state.isLoading = false;
    },
    logout(state, action) {
      localStorage.removeItem("auth");
      state.currentUser = null;
      state.isAuthenticated = false;
      redirect("/signin");
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

// custom action creators
export const register = (name, email, password, confirmPassword) => {
  return async (dispatch) => {
    authActions.setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(Apis.signupApi, formData, config);

      if (response.status !== 200) {
        dispatch(authActions.setError(response.data));
        return;
      }

      dispatch(
        authActions.registerSuccess({
          user: response.data,
        })
      );
      history.push("/signin");
      window.location.reload();
    } catch (error) {
      console.log("Error in authSlice.register", error);
      dispatch(authActions.setError(error.response.data));
    }
    authActions.setLoading(false);
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    authActions.setLoading(true);
    try {
      console.log("Trying to sing in..");
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(Apis.signinApi, formData, config);

      if (response.status !== 200) {
        dispatch(authActions.setError(response.data));
        return;
      }

      localStorage.setItem("auth", JSON.stringify(response.data));
      dispatch(authActions.loginSuccess(response.data));

      history.push("/");
      window.location.reload();
    } catch (error) {
      console.log("Error in authSlice.signin", error);
      dispatch(authActions.setError(error.response.data));
    }
    authActions.setLoading(false);
  };
};
