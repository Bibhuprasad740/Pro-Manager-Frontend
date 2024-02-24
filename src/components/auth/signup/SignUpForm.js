import React, { useState } from "react";

//icons
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

import classes from "./SignUpForm.module.css";
import SubmitButton from "../reusables/SubmitButton";

const SignUpForm = () => {
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

  return (
    <form className={classes.signUpForm}>
      {/* Name input */}
      <div className={classes.inputBox}>
        <CiUser size={30} />
        <input
          className={classes.userInput}
          type="text"
          placeholder="Name"
          value={name}
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
          onChange={changePasswordInputHandler}
        />
      </div>
      {/* Confirm Password input */}
      <div className={classes.inputBox}>
        <CiLock size={30} />
        <input
          className={classes.userInput}
          type="confirm password"
          placeholder="Password"
          value={confirmPassword}
          onChange={changesetConfirmPasswordInputHandler}
        />
      </div>

      <SubmitButton title="Register" />
    </form>
  );
};

export default SignUpForm;
