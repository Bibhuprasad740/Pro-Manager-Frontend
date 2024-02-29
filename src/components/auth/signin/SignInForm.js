import React, { useEffect, useState } from "react";

import classes from "./SignInForm.module.css";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

import SubmitButton from "../reusables/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../store/authSlice";
import { toast } from "react-hot-toast";

const size = 25;

const SignInForm = () => {
  const dispatch = useDispatch();
  const errorText = useSelector((state) => state.auth.error);

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

  useEffect(() => {
    if (errorText) {
      toast.error(errorText);
    }
  }, [errorText]);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPasswordHandler = () => {
    setShowPassword((state) => !state);
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
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          name="password"
          onChange={changePasswordInputHandler}
        />
        {!showPassword && (
          <BiSolidShow onClick={toggleShowPasswordHandler} size={size} />
        )}
        {showPassword && (
          <BiSolidHide onClick={toggleShowPasswordHandler} size={size} />
        )}
      </div>

      <SubmitButton title="Login" onClick={submitHandler} />
    </form>
  );
};

export default SignInForm;
