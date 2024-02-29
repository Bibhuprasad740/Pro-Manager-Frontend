import React from "react";
import ImageSection from "../reusables/ImageSection";
import FormSection from "./FormSection.js";

import classes from "./SignIn.module.css";
import { Toaster } from "react-hot-toast";

const SignIn = () => {
  return (
    <div className={classes.signInPage}>
      <ImageSection />
      <FormSection title="Log In" />
      <Toaster position="top-center" />
    </div>
  );
};

export default SignIn;
