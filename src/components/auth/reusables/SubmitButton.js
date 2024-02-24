import React from "react";

import classes from "./SubmitButton.module.css";

const SubmitButton = ({ title, onClick }) => {
  return (
    <button className={classes.submitButton} type="submit" onClick={onClick}>
      {title}
    </button>
  );
};

export default SubmitButton;
