import React from "react";
import classes from "./FormSection.module.css";
import RedirectButton from "../reusables/RedirectButton";
import SignInForm from "./SignInForm";
import { NavLink } from "react-router-dom";

const FormSection = ({ title }) => {
  return (
    <div className={classes.formSection}>
      <h2 className={classes.title}>{title}</h2>
      <SignInForm />
      <h2>Don't have an Account?</h2>
      <NavLink to="/signup">
        <RedirectButton title="Register" />
      </NavLink>
    </div>
  );
};

export default FormSection;
