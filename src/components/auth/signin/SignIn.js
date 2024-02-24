import React from "react";
import ImageSection from "../reusables/ImageSection";
import FormSection from "./FormSection.js";

import classes from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={classes.signInPage}>
      <ImageSection />
      <FormSection title="Log In" />
    </div>
  );
};

export default SignIn;
