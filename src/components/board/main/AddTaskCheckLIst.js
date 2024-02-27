import React from "react";

import classes from "./AddTaskCheckList.module.css";

import { MdDelete } from "react-icons/md";

const AddTaskCheckList = ({
  item,
  onDelete,
  onToggleCheck,
  onContentChange,
}) => {
  return (
    <div className={classes.addTaskchecklist}>
      <input
        className={classes.checkbox}
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggleCheck(item)}
      />
      <input
        type="text"
        value={item.content}
        placeholder="Enter something.."
        onChange={(event) => onContentChange(item, event.target.value)}
      />
      <MdDelete
        onClick={() => onDelete(item)}
        className={classes.deleteButton}
      />
    </div>
  );
};

export default AddTaskCheckList;
