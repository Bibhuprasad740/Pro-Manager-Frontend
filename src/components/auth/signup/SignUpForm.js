import React, { useState } from "react";

//icons
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

import classes from "./SignUpForm.module.css";
import SubmitButton from "../reusables/SubmitButton";
import { useDispatch } from "react-redux";
import { register } from "../../../store/authSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const changeNameInputHandler = (event) => {
    setName(event.target.value);
  };

  const [email, setEmail] = useState("");
  const changeEmailInputHandler = (event) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");
  const changePasswordInputHandler = (event) => {
    setPassword(event.target.value);
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const changesetConfirmPasswordInputHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(register(name, email, password, confirmPassword));
  };

  return (
    <form className={classes.signUpForm} onSubmit={submitHandler}>
      {/* Name input */}
      <div className={classes.inputBox}>
        <CiUser size={30} />
        <input
          className={classes.userInput}
          type="text"
          placeholder="Name"
          value={name}
          name="name"
          onChange={changeNameInputHandler}
        />
      </div>
      {/* Email input */}
      <div className={classes.inputBox}>
        <MdOutlineEmail size={30} />
        <input
          className={classes.userInput}
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={changeEmailInputHandler}
        />
      </div>
      {/* Password input */}
      <div className={classes.inputBox}>
        <CiLock size={30} />
        <input
          className={classes.userInput}
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={changePasswordInputHandler}
        />
      </div>
      {/* Confirm Password input */}
      <div className={classes.inputBox}>
        <CiLock size={30} />
        <input
          className={classes.userInput}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={changesetConfirmPasswordInputHandler}
        />
      </div>

      <SubmitButton title="Register" />
    </form>
  );
};

export default SignUpForm;
