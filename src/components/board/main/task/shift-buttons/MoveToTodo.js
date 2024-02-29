import React from "react";

import classes from "./CommonStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../../../../store/taskSlice";

const MoveToTodo = ({ id }) => {
  const token = useSelector((state) => state.auth.currentUser.token);
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(changeStatus(id, "todo", token));
  };
  return (
    <button onClick={onClickHandler} className={classes.shiftButton}>
      <p>TODO</p>
    </button>
  );
};

export default MoveToTodo;
