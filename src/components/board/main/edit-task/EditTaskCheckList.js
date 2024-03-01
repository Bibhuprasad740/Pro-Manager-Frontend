import React from "react";

import classes from "./EditTaskCheckList.module.css";

import { MdDelete } from "react-icons/md";

const EditTaskCheckList = ({
  item,
  onDelete,
  onToggleCheck,
  onContentChange,
}) => {
  return (
    <div className={classes.editTaskchecklist}>
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

export default EditTaskCheckList;
