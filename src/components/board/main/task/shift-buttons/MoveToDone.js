import React from "react";

import classes from "./CommonStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../../../../store/taskSlice";

const MoveToDone = ({ id }) => {
  const token = useSelector((state) => state.auth.currentUser.token);
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(changeStatus(id, "done", token));
  };
  return (
    <button onClick={onClickHandler} className={classes.shiftButton}>
      <p>DONE</p>
    </button>
  );
};

export default MoveToDone;
