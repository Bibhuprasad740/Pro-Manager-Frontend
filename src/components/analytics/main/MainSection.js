import React, { useEffect } from "react";

import classes from "./MainSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDueTasksApi,
  getTasksApi,
  getTasksBasedOnPriorityApi,
} from "../../../backend_apis";
import { fetchTasks, taskActions } from "../../../store/taskSlice";
import AnalyticsElement from "./AnalyticsElement";

const MainSection = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.ui.currentFilter);
  const userToken = useSelector((state) => state.auth.currentUser.token);
  const backlogTasks = useSelector((state) => state.task.tasks.backlog);
  const todoTasks = useSelector((state) => state.task.tasks.todo);
  const onGoingTasks = useSelector((state) => state.task.tasks.onGoing);
  const doneTasks = useSelector((state) => state.task.tasks.done);

  const lowCount = useSelector((state) => state.task.lowCount);
  const moderateCount = useSelector((state) => state.task.moderateCount);
  const highCount = useSelector((state) => state.task.highCount);
  const dueCount = useSelector((state) => state.task.dueCount);

  useEffect(() => {
    const fetchBacklog = async () => {
      const backlogTasksApi =
        getTasksApi + `?status=backlog&filter=${currentFilter}`;
      const backlogTasks = await fetchTasks(backlogTasksApi, userToken);
      dispatch(taskActions.setBacklog(backlogTasks));
    };
    const fetchTodo = async () => {
      const todoTasksApi = getTasksApi + `?status=todo&filter=${currentFilter}`;
      const todoTasks = await fetchTasks(todoTasksApi, userToken);
      dispatch(taskActions.setTodo(todoTasks));
    };
    const fetchOnGoing = async () => {
      const onGoingTasksApi =
        getTasksApi + `?status=ongoing&filter=${currentFilter}`;
      const onGoingTasks = await fetchTasks(onGoingTasksApi, userToken);
      dispatch(taskActions.setOnGoing(onGoingTasks));
    };
    const fetchDone = async () => {
      const doneTasksApi = getTasksApi + `?status=done&filter=${currentFilter}`;
      const doneTasks = await fetchTasks(doneTasksApi, userToken);
      dispatch(taskActions.setDone(doneTasks));
    };

    const fetchLowPriority = async () => {
      const lowPriorityApi = getTasksBasedOnPriorityApi + `?priority=low`;
      const lowPriorityTasks = await fetchTasks(lowPriorityApi, userToken);
      dispatch(taskActions.setLowCount(lowPriorityTasks.length));
    };

    const fetchMediumPriority = async () => {
      const moderatePriorityApi =
        getTasksBasedOnPriorityApi + `?priority=moderate`;
      const moderatePriorityTasks = await fetchTasks(
        moderatePriorityApi,
        userToken
      );
      dispatch(taskActions.setModerateCount(moderatePriorityTasks.length));
    };

    const fetchHighPriority = async () => {
      const highPriorityApi = getTasksBasedOnPriorityApi + `?priority=high`;
      const highPriorityTasks = await fetchTasks(highPriorityApi, userToken);
      dispatch(taskActions.setHighCount(highPriorityTasks.length));
    };

    const fetchDueTasks = async () => {
      const dueTasks = await fetchTasks(getDueTasksApi, userToken);
      dispatch(taskActions.setDueCount(dueTasks.length));
    };

    fetchBacklog();
    fetchTodo();
    fetchOnGoing();
    fetchDone();
    fetchLowPriority();
    fetchMediumPriority();
    fetchHighPriority();
    fetchDueTasks();
  }, [currentFilter, dispatch, userToken]);
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
