import React from "react";

import classes from "./UpdateButton.module.css";
import { useSelector } from "react-redux";

const UpdateButton = ({ title, onClick }) => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <button className={classes.updateButton} type="submit" onClick={onClick}>
      {`${isLoading ? "Loading..." : title}`}
    </button>
  );
};

export default UpdateButton;
