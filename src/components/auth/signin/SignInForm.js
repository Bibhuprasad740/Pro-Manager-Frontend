import React, { useState } from "react";

import classes from "./SignInForm.module.css";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import SubmitButton from "../reusables/SubmitButton";
import { useDispatch } from "react-redux";
import { signin } from "../../../store/authSlice";

const SignInForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const changeEmailInputHandler = (event) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");
  const changePasswordInputHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <form className={classes.signInForm} onSubmit={submitHandler}>
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

      <SubmitButton title="Login" />
    </form>
  );
};

export default SignInForm;
