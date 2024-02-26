import React from "react";

import classes from "./TaskSection.module.css";
import Task from "./Task";

import { VscCollapseAll } from "react-icons/vsc";

const TaskSection = ({ title }) => {
  return (
    <div className={classes.taskSection}>
      <p className={classes.title}>{title}</p>
      <Task />
      <Task />
    </div>
  );
};

export default TaskSection;
