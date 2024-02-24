import React from "react";
import classes from "./RedirectButton.module.css";

const RedirectButton = ({ title, onClick }) => {
  return (
    <button className={classes.redirectButton} onClick={onClick}>
      {title}
    </button>
  );
};

export default RedirectButton;
