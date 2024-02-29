import React from "react";
import ImageSection from "../reusables/ImageSection";

import classes from "./SignUp.module.css";
import FormSection from "./FormSection";
import { Toaster } from "react-hot-toast";

const SignUp = () => {
  return (
    <div className={classes.signUpPage}>
      <ImageSection />
      <FormSection title="Register" />
      <Toaster position="top-center" />
    </div>
  );
};

export default SignUp;
