import React from "react";

import classes from "./MainSection.module.css";
import { useSelector } from "react-redux";
import AnalyticsElement from "./AnalyticsElement";

const MainSection = () => {
  const backlogTasks = useSelector((state) => state.task.tasks.backlog);
  const todoTasks = useSelector((state) => state.task.tasks.todo);
  const onGoingTasks = useSelector((state) => state.task.tasks.onGoing);
  const doneTasks = useSelector((state) => state.task.tasks.done);

  const lowCount = useSelector((state) => state.task.lowCount);
  const moderateCount = useSelector((state) => state.task.moderateCount);
  const highCount = useSelector((state) => state.task.highCount);
  const dueCount = useSelector((state) => state.task.dueCount);

  return (
    <div className={classes.mainSection}>
      <p className={classes.title}>Analytics</p>
      <section className={classes.detailsSection}>
        <section className={classes.analyticsSection}>
          <AnalyticsElement title="Backlog Tasks" count={backlogTasks.length} />
          <AnalyticsElement title="To-do Tasks" count={todoTasks.length} />
          <AnalyticsElement
            title="In-Progress Tasks"
            count={onGoingTasks.length}
          />
          <AnalyticsElement title="Completed Tasks" count={doneTasks.length} />
        </section>
        <section className={classes.analyticsSection}>
          <AnalyticsElement title="Low Priority" count={lowCount} />
          <AnalyticsElement title="Moderate Priority" count={moderateCount} />
          <AnalyticsElement title="High Priority" count={highCount} />
          <AnalyticsElement title="Due Date Tasks" count={dueCount} />
        </section>
      </section>
    </div>
  );
};

export default MainSection;
