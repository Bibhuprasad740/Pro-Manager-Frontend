import React from "react";

import classes from "./TaskSection.module.css";
import Task from "./Task";

import { VscCollapseAll } from "react-icons/vsc";
import { IoAddOutline } from "react-icons/io5";

const size = 20;

const TaskSection = ({ title, isTodo }) => {
  return (
    <div className={classes.taskSection}>
      <section className={classes.header}>
        <p className={classes.title}>{title}</p>
        <div className={classes.actions}>
          {isTodo && (
            <IoAddOutline className={classes.actionButton} size={size} />
          )}
          <VscCollapseAll className={classes.actionButton} size={size} />
        </div>
      </section>
      <Task />
      <Task />
    </div>
  );
};

export default TaskSection;
