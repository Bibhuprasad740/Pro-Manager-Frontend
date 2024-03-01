import React, { useState } from "react";

import classes from "./TaskSection.module.css";
import Task from "../task/Task";

import { VscCollapseAll } from "react-icons/vsc";
import { IoAddOutline } from "react-icons/io5";
import AddTaskModal from "../add-task/AddTaskModal";

const size = 20;

const TaskSection = ({ title, isTodo, tasks }) => {
  const [showModal, setShowModal] = useState(false);
  const addCardHandler = () => {
    setShowModal(true);
  };

  const [isCollapsedAll, setIsCollapsedAll] = useState(false);
  const collapseAllHandler = () => {
    setIsCollapsedAll(true);
  };
  const collapseAllDisableHandler = () => {
    setIsCollapsedAll(false);
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
            onClick={collapseAllHandler}
            className={classes.actionButton}
            size={size}
          />
        </div>
      </section>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          isCollapsedAll={isCollapsedAll}
          onShow={collapseAllDisableHandler}
        />
      ))}
      {showModal && <AddTaskModal onClose={closeModal} />}
    </div>
  );
};

export default TaskSection;
