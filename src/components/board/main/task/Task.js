import React, { useState } from "react";

import classes from "./Task.module.css";

import { PiDotOutlineFill } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import CheckList from "./CheckList";
import { format } from "date-fns";
import MoveToBacklog from "./shift-buttons/MoveToBacklog";
import MoveToDone from "./shift-buttons/MoveToDone";
import MoveToOnGoing from "./shift-buttons/MoveToOnGoing";
import MoveToTodo from "./shift-buttons/MoveToTodo";
import DeleteTaskModal from "./DeleteTaskModal";

const size = 20;

const Task = ({ task }) => {
  const [showCheckList, setShowCheckList] = useState(false);
  const [showCardOptions, setShowCardOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const closeModal = () => {
    setShowDeleteModal(false);
  };

  const showCheckListHandler = () => {
    setShowCheckList((state) => !state);
  };

  const cardOptionsClickHandler = () => {
    setShowCardOptions((state) => !state);
  };

  const deleteTaskHandler = () => {
    setShowDeleteModal(true);
    setShowCardOptions(false);
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

  let shiftButtons = null;
  if (task.status === "backlog") {
    shiftButtons = (
      <>
        <MoveToTodo id={task._id} />
        <MoveToDone id={task._id} />
        <MoveToOnGoing id={task._id} />
      </>
    );
  } else if (task.status === "todo") {
    shiftButtons = (
      <>
        <MoveToBacklog id={task._id} />
        <MoveToDone id={task._id} />
        <MoveToOnGoing id={task._id} />
      </>
    );
  } else if (task.status === "ongoing") {
    shiftButtons = (
      <>
        <MoveToBacklog id={task._id} />
        <MoveToDone id={task._id} />
        <MoveToTodo id={task._id} />
      </>
    );
  } else {
    shiftButtons = (
      <>
        <MoveToBacklog id={task._id} />
        <MoveToOnGoing id={task._id} />
        <MoveToTodo id={task._id} />
      </>
    );
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
            <button onClick={deleteTaskHandler} className={classes.cardOption}>
              Delete
            </button>
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
            className={
              task.status === "done"
                ? classes.done
                : isDueDatePassed
                ? classes.deadline
                : classes.normal
            }
          >
            <p>{formattedDate}</p>
          </button>
        )}

        {/* Shift buttons */}
        <div className={classes.shiftButtons}>{shiftButtons}</div>
      </section>
      {showDeleteModal && (
        <DeleteTaskModal onClose={closeModal} id={task._id} />
      )}
    </div>
  );
};

export default Task;
