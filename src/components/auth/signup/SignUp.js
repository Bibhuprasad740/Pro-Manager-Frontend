import React from "react";
import ImageSection from "../reusables/ImageSection";

import classes from "./SignUp.module.css";
import FormSection from "../reusables/FormSection";

const SignUp = () => {
  return (
    <div className={classes.signUpPage}>
      <ImageSection />
      <FormSection />
    </div>
  );
};

export default SignUp;
