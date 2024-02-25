import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Apis from "../backend_apis";
import history from "../history";

const initialUser = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  isLoading: false,
  isAuthenticated: false,
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
  },
});

export const authActions = authSlice.actions;

export default authSlice;

// custom action creators
export const register = (name, email, password, confirmPassword) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const response = await axios.post(Apis.signupApi, formData, config);

      if (response.status !== 200) {
        dispatch(authActions.registerFailure({ error: response.data }));
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
      dispatch(authActions.registerFailure({ error: error.response.data }));
    }
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    try {
      console.log("Trying to sing in..");
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const response = await axios.post(Apis.signinApi, formData, config);

      if (response.status !== 200) {
        dispatch(authActions.loginFailure({ error: response.data }));
        return;
      }

      localStorage.setItem("auth", JSON.stringify(response.data));
      dispatch(authActions.loginSuccess(response.data));

      history.push("/");
      window.location.reload();
    } catch (error) {
      console.log("Error in authSlice.signin", error);
      dispatch(authActions.loginFailure({ error: error.response.data }));
    }
  };
};
