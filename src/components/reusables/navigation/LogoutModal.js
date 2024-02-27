import React from "react";

import classes from "./LogoutModal.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";

const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutConfirmHandler = () => {
    onClose();
    navigate("/signin");
    dispatch(authActions.logout());
  };
  return (
    <div className={classes.logoutModal}>
      <div className={classes.overlay}></div>
      <div className={classes.modalContent}>
        <p className={classes.title}>Are you sure want to Logout?</p>
        <button className={classes.confirm} onClick={logoutConfirmHandler}>
          Yes, Logout
        </button>
        <button className={classes.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
