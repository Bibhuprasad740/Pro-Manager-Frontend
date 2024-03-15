import React from "react";

import classes from "./SubmitButton.module.css";
import { useSelector } from "react-redux";

const SubmitButton = ({ title, onClick }) => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <button
      disabled={isLoading}
      className={classes.submitButton}
      type="submit"
      onClick={onClick}
    >
      {`${isLoading ? "Loading..." : title}`}
    </button>
  );
};

export default SubmitButton;
