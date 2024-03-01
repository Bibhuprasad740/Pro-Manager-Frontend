import React, { useEffect, useState } from "react";

import classes from "./ShaarablePage.module.css";

import logo from "../../assets/images/logo.png";
import { PiDotOutlineFill } from "react-icons/pi";
import CheckList from "../board/main/task/CheckList";
import { useParams } from "react-router-dom";
import { shareLinkApi } from "../../backend_apis";
import { fetchTask } from "../../store/taskSlice";
import { format } from "date-fns";

const SharablePage = () => {
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { taskId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    const loadTask = async () => {
      const api = `${shareLinkApi}/${taskId}`;
      console.log(api);
      const fetchedTask = await fetchTask(api);
      setTask(fetchedTask);
    };
    loadTask();
    setIsLoading(false);
  }, [taskId]);

  const getPriorityColor = (priority) => {
    if (priority === "low") {
      return "green";
    } else if (priority === "moderate") {
      return "blue";
    } else {
      return "red";
    }
  };

  const getCheckedCount = (task) => {
    const checkedChecklistsCount = task.checklists.reduce(
      (acc, list) => acc + list.checked,
      0
    );
    return checkedChecklistsCount;
  };

  const getFormattedDate = (task) => {
    const formattedDate = format(task.dueDate, "MMM dd");
    return formattedDate;
  };

  return (
    <>
      {isLoading && (
        <div className={classes.loadingSection}>
          <p className={classes.loading}>Loading...</p>
        </div>
      )}
      {task && (
        <div className={classes.sharablePage}>
          <img className={classes.logo} src={logo} alt="logo.png" />
          <div className={classes.wrapper}>
            <section className={classes.content}>
              {/* Priority */}
              <div className={classes.priority}>
                <PiDotOutlineFill
                  color={getPriorityColor(task.priority)}
                  size={30}
                />
                <p>{task.priority.toUpperCase()} PRIORITY</p>
              </div>
              {/* Title */}
              <p className={classes.title}>{task.title}</p>

              {/* Checklist */}
              <section className={classes.checklistSection}>
                <div className={classes.checkListHeader}>
                  <p className={classes.checkListHeaderTitle}>
                    Checklist({getCheckedCount(task)}/{task.checklists.length})
                  </p>
                </div>

                {/* Individual Checklists */}
                {task.checklists.map((data) => (
                  <CheckList data={data} onToggleCheck={() => {}} />
                ))}
              </section>

              {task.dueDate && (
                <div className={classes.footer}>
                  <p className={classes.dueDate}>Due Date</p>
                  <button className={classes.deadline}>
                    <p>{getFormattedDate(task)}</p>
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default SharablePage;
