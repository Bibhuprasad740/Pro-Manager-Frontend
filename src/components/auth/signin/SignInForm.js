import React, { useState } from "react";

import classes from "./SignInForm.module.css";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import SubmitButton from "../reusables/SubmitButton";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const changeEmailInputHandler = (event) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");
  const changePasswordInputHandler = (event) => {
    setPassword(event.target.value);
  };
  return (
    <form className={classes.signInForm}>
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

      <SubmitButton title="Login" />
    </form>
  );
};

export default SignInForm;
