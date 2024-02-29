import React, { useState } from "react";

import classes from "./TaskSection.module.css";
import Task from "../task/Task";

import { VscCollapseAll } from "react-icons/vsc";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../store/uiSlice";
import AddTaskModal from "../add-task/AddTaskModal";

const size = 20;

const TaskSection = ({ title, isTodo, tasks }) => {
  const dispatch = useDispatch();

  // code to be added here...
  const collapseSectionHandler = () => {
    if (title === "Backlog") {
      dispatch(uiActions.collapseBacklog());
    }
  };

  const [showModal, setShowModal] = useState(false);
  const addCardHandler = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className={classes.taskSection}>
      <section className={classes.header}>
        <p className={classes.title}>{title}</p>
        <div className={classes.actions}>
          {isTodo && (
            <IoAddOutline
              className={classes.actionButton}
              onClick={addCardHandler}
              size={size}
            />
          )}
          <VscCollapseAll
            onClick={collapseSectionHandler}
            className={classes.actionButton}
            size={size}
          />
        </div>
      </section>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
      {showModal && <AddTaskModal onClose={closeModal} />}
    </div>
  );
};

export default TaskSection;
