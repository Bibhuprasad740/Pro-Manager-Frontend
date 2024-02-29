import React, { useState } from "react";

import classes from "./MainSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CiLock, CiUser } from "react-icons/ci";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import UpdateButton from "./UpdateButton";
import { authActions, updateUserCredential } from "../../../store/authSlice";

const size = 25;

const MainSection = () => {
  const userName = useSelector((state) => state.auth.currentUser.name);
  const userToken = useSelector((state) => state.auth.currentUser.token);
  const errorText = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const [name, setName] = useState(userName);
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const [oldPassword, setOldPassword] = useState("");
  const changeOldPasswordInputHandler = (event) => {
    setOldPassword(event.target.value);
  };

  const [newPassword, setNewPassword] = useState("");
  const changeNewPasswordInputHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPasswordHandler = () => {
    setShowPassword((state) => !state);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.setError(null));
    dispatch(updateUserCredential(name, oldPassword, newPassword, userToken));
    setName("");
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className={classes.mainSection}>
      <p className={classes.title}>Settings</p>
      <form className={classes.formSection} onSubmit={submitHandler}>
        {/* Name input */}
        <div className={classes.inputBox}>
          <CiUser size={30} />
          <input
            className={classes.userInput}
            type="text"
            placeholder="Name"
            value={name}
            name="text"
            onChange={nameChangeHandler}
          />
        </div>
        {/* Password input */}
        <div className={classes.inputBox}>
          <CiLock size={30} />
          <input
            className={classes.userInput}
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            name="password"
            onChange={changeOldPasswordInputHandler}
          />
          {!showPassword && (
            <BiSolidShow onClick={toggleShowPasswordHandler} size={size} />
          )}
          {showPassword && (
            <BiSolidHide onClick={toggleShowPasswordHandler} size={size} />
          )}
        </div>
        {/* Confirm Password input */}
        <div className={classes.inputBox}>
          <CiLock size={30} />
          <input
            className={classes.userInput}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            name="confirmPassword"
            onChange={changeNewPasswordInputHandler}
          />
          {!showPassword && (
            <BiSolidShow onClick={toggleShowPasswordHandler} size={size} />
          )}
          {showPassword && (
            <BiSolidHide onClick={toggleShowPasswordHandler} size={size} />
          )}
        </div>

        {errorText && <p className={classes.error}>{errorText}</p>}

        <UpdateButton title="Update" onClick={submitHandler} />
      </form>
    </div>
  );
};

export default MainSection;
