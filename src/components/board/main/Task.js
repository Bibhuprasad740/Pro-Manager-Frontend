import React, { useState } from "react";

import classes from "./Task.module.css";

import { PiDotOutlineFill } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import CheckList from "./CheckList";

const size = 20;

const Task = () => {
  const [showCheckList, setShowCheckList] = useState(false);

  const showCheckListHandler = () => {
    setShowCheckList((state) => !state);
  };
  return (
    <div className={classes.task}>
      {/* Task header */}
      <section className={classes.header}>
        {/* Priority */}
        <div className={classes.priority}>
          <PiDotOutlineFill color="red" size={30} />
          <p>HIGH PRIORITY</p>
        </div>
        {/* Three dot icon */}
        <HiDotsHorizontal size={size} />
      </section>

      {/* Title */}
      <p className={classes.title}>Hero Section</p>

      {/* Checklist */}
      <section className={classes.checklistSection}>
        <div className={classes.checkListHeader}>
          <p className={classes.checkListHeaderTitle}>Checklist(1/3)</p>
          <button onClick={showCheckListHandler}>
            {showCheckList && <MdExpandLess size={25} />}
            {!showCheckList && <MdExpandMore size={25} />}
          </button>
        </div>

        {/* Individual Checklists */}
        {showCheckList && (
          <>
            <CheckList />
            <CheckList />
            <CheckList />
          </>
        )}
      </section>

      {/* Footer section */}
      <section className={classes.footer}>
        {/* Deadline */}
        <button className={classes.deadline}>
          <p>Feb 10th</p>
        </button>

        <button className={classes.shiftButton}>
          <p>PROGRESS</p>
        </button>
        <button className={classes.shiftButton}>
          <p>TODO</p>
        </button>
        <button className={classes.shiftButton}>
          <p>DONE</p>
        </button>
      </section>
    </div>
  );
};

export default Task;
