import React from "react";

import classes from "./CommonStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../../../../store/taskSlice";

const MoveToOnGoing = ({ id }) => {
  const token = useSelector((state) => state.auth.currentUser.token);
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(changeStatus(id, "ongoing", token));
  };
  return (
    <button onClick={onClickHandler} className={classes.shiftButton}>
      <p>ON GOING</p>
    </button>
  );
};

export default MoveToOnGoing;
