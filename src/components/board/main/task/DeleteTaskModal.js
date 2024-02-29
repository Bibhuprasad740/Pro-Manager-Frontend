import React from "react";

import classes from "./DeleteTaskModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../../store/taskSlice";

const DeleteTaskModal = ({ onClose, id }) => {
  const token = useSelector((state) => state.auth.currentUser.token);
  const dispatch = useDispatch();
  const deleteConfirmHandler = () => {
    dispatch(deleteTask(id, token));
    onClose();
    // add dispatch
  };
  return (
    <div className={classes.deleteTaskModal}>
      <div className={classes.overlay}></div>
      <div className={classes.modalContent}>
        <p className={classes.title}>Are you sure want to Delete?</p>
        <button className={classes.confirm} onClick={deleteConfirmHandler}>
          Yes, Delete
        </button>
        <button className={classes.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
