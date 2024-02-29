import React, { useState } from "react";
import classes from "./AddTaskModal.module.css";
import { PiDotOutlineFill } from "react-icons/pi";
import AddTaskCheckList from "./AddTaskCheckLIst";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask, taskActions } from "../../../../store/taskSlice";

const AddTaskModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.currentUser.token);

  const [selectedPriority, setSelectedPriority] = useState(null);
  const priorityClickHandler = (priority) => {
    setSelectedPriority(priority);
  };

  const [pickedDate, setPickedDate] = useState(null);
  const dateChangeHandler = (date) => {
    setPickedDate(date);
  };

  const [title, setTitle] = useState("");
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const [checklists, setChecklists] = useState([
    {
      id: new Date(),
      checked: false,
      content: "",
    },
  ]);

  const checkedChecklistsCount = checklists.reduce(
    (acc, list) => acc + list.checked,
    0
  );

  const addChecklistHandler = () => {
    const newItem = {
      id: new Date(),
      checked: false,
      content: "",
    };
    const updatedChecklists = [...checklists];
    updatedChecklists.push(newItem);
    setChecklists(updatedChecklists);
  };

  const toggleCheckHandler = (itemToToggle) => {
    setChecklists((prevChecklist) =>
      prevChecklist.map((item) =>
        item === itemToToggle ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const contentChangeHandler = (itemToChange, newContent) => {
    setChecklists((prevChecklist) =>
      prevChecklist.map((item) =>
        item === itemToChange ? { ...item, content: newContent } : item
      )
    );
  };

  const deleteChecklistHandler = (itemToDelete) => {
    if (checklists.length === 1) {
      dispatch(taskActions.setError("Minimum one checklist required!"));
      return;
    }
    setChecklists((prevChecklist) =>
      prevChecklist.filter((item) => item.id !== itemToDelete.id)
    );
  };

  const onSaveHandler = () => {
    if (!selectedPriority) {
      dispatch(taskActions.setError("Priority is required!"));
      return;
    }
    if (!title || title.trim().length === 0) {
      dispatch(taskActions.setError("Title is required!"));
      return;
    }
    for (let checklist of checklists) {
      if (checklist.content.trim().length === 0) {
        dispatch(taskActions.setError("Invalid checklist detected!"));
        return;
      }
    }

    dispatch(taskActions.setError(null));

    const task = {
      priority: selectedPriority,
      title,
      checklists,
      dueDate: pickedDate,
      status: "todo",
    };

    dispatch(addTask(task, userToken));

    onClose();
  };

  return (
    <div className={classes.addTaskModal}>
      <div className={classes.overlay}></div>
      <div className={classes.modalContent}>
        {/* Title section */}
        <div className={classes.titleSection}>
          <p className={classes.title}>Title</p>
          <p className={classes.star}>*</p>
        </div>
        {/* Title Input Section*/}
        <section className={classes.titleInputSection}>
          <input
            type="text"
            placeholder="Enter Task Title"
            value={title}
            onChange={titleChangeHandler}
          />
        </section>

        {/* Priority Section */}
        <section className={classes.prioritySection}>
          <p className={classes.title}>Select Priority</p>
          <p className={classes.star}>*</p>

          {/* Priority Selection Buttons */}
          <button
            onClick={() => priorityClickHandler("high")}
            className={`${classes.priority} ${
              selectedPriority === "high" ? classes.active : ""
            }`}
          >
            <PiDotOutlineFill color="red" size={30} />
            <p>HIGH</p>
          </button>
          <button
            onClick={() => priorityClickHandler("moderate")}
            className={`${classes.priority} ${
              selectedPriority === "moderate" ? classes.active : ""
            }`}
          >
            <PiDotOutlineFill color="blue" size={30} />
            <p>MODERATE</p>
          </button>
          <button
            onClick={() => priorityClickHandler("low")}
            className={`${classes.priority} ${
              selectedPriority === "low" ? classes.active : ""
            }`}
          >
            <PiDotOutlineFill color="green" size={30} />
            <p>LOW</p>
          </button>
        </section>

        {/* Checklist Section */}
        <section className={classes.checklistSection}>
          <div className={classes.checklistHeader}>
            <p className={classes.title}>
              Checklist({checkedChecklistsCount}/{checklists.length})
            </p>
            <p className={classes.star}>*</p>
          </div>
          {/* Checklists */}
          {checklists.map((checklist) => (
            <AddTaskCheckList
              key={checklist.id}
              item={checklist}
              onDelete={deleteChecklistHandler}
              onToggleCheck={toggleCheckHandler}
              onContentChange={contentChangeHandler}
            />
          ))}

          {/* Add new check list button */}
          <button onClick={addChecklistHandler} className={classes.addButton}>
            + Add new
          </button>
        </section>

        {/* Footer section */}
        <section className={classes.footer}>
          <ReactDatePicker
            placeholderText="Select Due Date"
            selected={pickedDate}
            onChange={dateChangeHandler}
            dateFormat="dd/MM/yyyy"
          />

          <div className={classes.actionButtons}>
            <button className={classes.cancel} onClick={onClose}>
              Cancel
            </button>
            <button className={classes.save} onClick={onSaveHandler}>
              Save
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddTaskModal;
