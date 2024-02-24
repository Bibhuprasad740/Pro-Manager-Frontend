import React from "react";
import classes from "./FormSection.module.css";
import SignUpForm from "./SignUpForm";
import RedirectButton from "../reusables/RedirectButton";
import { NavLink } from "react-router-dom";

const FormSection = ({ title }) => {
  return (
    <div className={classes.formSection}>
      <h2 className={classes.title}>{title}</h2>
      <SignUpForm />
      <h2>Have an Account?</h2>
      <NavLink to="/signin">
        <RedirectButton title="Log In" />
      </NavLink>
    </div>
  );
};

export default FormSection;
