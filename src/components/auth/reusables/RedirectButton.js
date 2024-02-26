import React from "react";
import classes from "./RedirectButton.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";

const RedirectButton = ({ title }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(authActions.setError(null));
  };
  return (
    <button className={classes.redirectButton} onClick={onClick}>
      {title}
    </button>
  );
};

export default RedirectButton;
