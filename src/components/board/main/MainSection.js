import React from "react";

import classes from "./MainSection.module.css";
import { useSelector } from "react-redux";
import TaskSection from "./TaskSection";

const MainSection = () => {
  const { name } = useSelector((state) => state.auth.currentUser);
  const firstName = name.split(" ")[0];
  const date = new Date();
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className={classes.mainSection}>
      <section className={classes.headerSection}>
        <p className={classes.title}>{`Welcome! ${firstName}`}</p>
        <p className={classes.title}>{formattedDate}</p>
      </section>
      <section className={classes.tasksSection}>
        <TaskSection title="Backlog" />
        <TaskSection title="Todo" />
        <TaskSection title="On Going" />
        <TaskSection title="Done" />
      </section>
    </div>
  );
};

export default MainSection;
