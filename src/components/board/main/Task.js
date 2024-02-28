import React, { useState } from "react";

import classes from "./Task.module.css";

import { PiDotOutlineFill } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import CheckList from "./CheckList";
import { format } from "date-fns";

const size = 20;

const Task = ({ task }) => {
  const [showCheckList, setShowCheckList] = useState(false);
  const [showCardOptions, setShowCardOptions] = useState(false);

  const showCheckListHandler = () => {
    setShowCheckList((state) => !state);
  };

  const cardOptionsClickHandler = () => {
    setShowCardOptions((state) => !state);
  };

  // TODO: implement this function
  const toggleCheckHandler = (item) => {};

  const priority = task.priority.toUpperCase();

  let priorityColor;
  if (task.priority === "low") {
    priorityColor = "green";
  } else if (task.priority === "moderate") {
    priorityColor = "blue";
  } else {
    priorityColor = "red";
  }

  const checkedChecklistsCount = task.checklists.reduce(
    (acc, list) => acc + list.checked,
    0
  );

  var formattedDate = null;
  var isDueDatePassed = false;
  if (task.dueDate) {
    formattedDate = format(task.dueDate, "MMM dd");

    const today = new Date();
    isDueDatePassed = Date(task.dueDate) < today;
  }

  return (
    <div className={classes.task}>
      {/* Task header */}
      <section className={classes.header}>
        {/* Priority */}
        <div className={classes.priority}>
          <PiDotOutlineFill color={priorityColor} size={30} />
          <p>{priority} PRIORITY</p>
        </div>
        {/* Three dot icon */}
        <HiDotsHorizontal
          onClick={cardOptionsClickHandler}
          className={classes.cardOptionsButton}
          size={size}
        />
      </section>

      {/* Card Options */}
      {showCardOptions && (
        <div className={classes.wrapper}>
          <div className={classes.cardOptions}>
            <button className={classes.cardOption}>Edit</button>
            <button className={classes.cardOption}>Share</button>
            <button className={classes.cardOption}>Delete</button>
          </div>
        </div>
      )}

      {/* Title */}
      <p className={classes.title}>{task.title}</p>

      {/* Checklist */}
      <section className={classes.checklistSection}>
        <div className={classes.checkListHeader}>
          <p className={classes.checkListHeaderTitle}>
            Checklist({checkedChecklistsCount}/{task.checklists.length})
          </p>
          <button onClick={showCheckListHandler}>
            {showCheckList && <MdExpandLess size={25} />}
            {!showCheckList && <MdExpandMore size={25} />}
          </button>
        </div>

        {/* Individual Checklists */}
        {showCheckList && (
          <>
            {task.checklists.map((data) => (
              <CheckList
                key={data._id}
                data={data}
                onToggleCheck={toggleCheckHandler}
              />
            ))}
          </>
        )}
      </section>

      {/* Footer section */}
      <section className={classes.footer}>
        {/* Deadline */}
        {formattedDate && (
          <button
            className={isDueDatePassed ? classes.deadline : classes.normal}
          >
            <p>{formattedDate}</p>
          </button>
        )}

        {/* Shift buttons */}
        <div className={classes.shiftButtons}>
          <button className={classes.shiftButton}>
            <p>PROGRESS</p>
          </button>
          <button className={classes.shiftButton}>
            <p>TODO</p>
          </button>
          <button className={classes.shiftButton}>
            <p>DONE</p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Task;
