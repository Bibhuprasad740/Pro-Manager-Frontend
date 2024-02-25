import React from "react";

import classes from "./ErrorPage.module.css";

import errorImage from "../../assets/images/404.jpg";

const ErrorPage = () => {
  return (
    <div className={classes.errorPage}>
      <div className={classes.imageSection}>
        <img src={errorImage} alt="404.jpg" />
        <h1 className="">Page not found!</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
