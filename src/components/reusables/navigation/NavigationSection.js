import React, { useEffect, useState } from "react";

import classes from "./NavigationSection.module.css";

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";

import logo from "../../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { fetchTasks, taskActions } from "../../../store/taskSlice";
import {
  getDueTasksApi,
  getTasksApi,
  getTasksBasedOnPriorityApi,
} from "../../../backend_apis";

const size = 25;

const NavigationSection = () => {
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const closeModalHandler = () => {
    setShowLogoutModal(false);
  };

  const logoutHandler = () => {
    setShowLogoutModal(true);
  };

  const errorTextTask = useSelector((state) => state.task.error);
  const errorTextAuth = useSelector((state) => state.auth.error);

  const successMessageAuth = useSelector((state) => state.auth.message);
  const successMessageTask = useSelector((state) => state.task.message);

  const currentFilter = useSelector((state) => state.ui.currentFilter);
  const userToken = useSelector((state) => state.auth.currentUser.token);

  useEffect(() => {
    const fetchBacklog = async () => {
      const backlogTasksApi =
        getTasksApi + `?status=backlog&filter=${currentFilter}`;
      const backlogTasks = await fetchTasks(backlogTasksApi, userToken);
      dispatch(taskActions.setBacklog(backlogTasks.tasks));

      if (backlogTasks.error) {
        toast.error(backlogTasks.error);
      }
    };
    const fetchTodo = async () => {
      const todoTasksApi = getTasksApi + `?status=todo&filter=${currentFilter}`;
      const todoTasks = await fetchTasks(todoTasksApi, userToken);
      dispatch(taskActions.setTodo(todoTasks.tasks));

      if (todoTasks.error) {
        toast.error(todoTasks.error);
      }
    };
    const fetchOnGoing = async () => {
      const onGoingTasksApi =
        getTasksApi + `?status=ongoing&filter=${currentFilter}`;
      const onGoingTasks = await fetchTasks(onGoingTasksApi, userToken);
      dispatch(taskActions.setOnGoing(onGoingTasks.tasks));

      if (onGoingTasks.error) {
        toast.error(onGoingTasks.error);
      }
    };
    const fetchDone = async () => {
      const doneTasksApi = getTasksApi + `?status=done&filter=${currentFilter}`;
      const doneTasks = await fetchTasks(doneTasksApi, userToken);
      dispatch(taskActions.setDone(doneTasks.tasks));

      if (doneTasks.error) {
        toast.error(doneTasks.error);
      }
    };

    const fetchLowPriority = async () => {
      const lowPriorityApi = getTasksBasedOnPriorityApi + `?priority=low`;
      const lowPriorityTasks = await fetchTasks(lowPriorityApi, userToken);
      dispatch(taskActions.setLowCount(lowPriorityTasks.tasks.length));

      if (lowPriorityTasks.error) {
        toast.error(lowPriorityTasks.error);
      }
    };

    const fetchMediumPriority = async () => {
      const moderatePriorityApi =
        getTasksBasedOnPriorityApi + `?priority=moderate`;
      const moderatePriorityTasks = await fetchTasks(
        moderatePriorityApi,
        userToken
      );
      dispatch(
        taskActions.setModerateCount(moderatePriorityTasks.tasks.length)
      );

      if (moderatePriorityTasks.error) {
        toast.error(moderatePriorityTasks.error);
      }
    };

    const fetchHighPriority = async () => {
      const highPriorityApi = getTasksBasedOnPriorityApi + `?priority=high`;
      const highPriorityTasks = await fetchTasks(highPriorityApi, userToken);
      dispatch(taskActions.setHighCount(highPriorityTasks.tasks.length));

      if (highPriorityTasks.error) {
        toast.error(highPriorityTasks.error);
      }
    };

    const fetchDueTasks = async () => {
      const dueTasks = await fetchTasks(getDueTasksApi, userToken);
      dispatch(taskActions.setDueCount(dueTasks.tasks.length));

      if (dueTasks.error) {
        toast.error(dueTasks.error);
      }
    };

    fetchBacklog();
    fetchTodo();
    fetchOnGoing();
    fetchDone();
    fetchLowPriority();
    fetchMediumPriority();
    fetchHighPriority();
    fetchDueTasks();

    if (errorTextTask) {
      toast.error(errorTextTask);
      dispatch(authActions.setError(null));
    }
    if (errorTextAuth) {
      toast.error(errorTextAuth);
      dispatch(taskActions.setError(null));
    }
    if (successMessageAuth) {
      toast.success(successMessageAuth);
      dispatch(authActions.setMessage(null));
    }
    if (successMessageTask) {
      toast.success(successMessageTask);
      dispatch(taskActions.setMessage(null));
    }
  }, [
    errorTextTask,
    errorTextAuth,
    dispatch,
    successMessageAuth,
    successMessageTask,
    currentFilter,
    userToken,
  ]);

  return (
    <div className={classes.navigationSection}>
      <img className={classes.image} src={logo} alt="logo.png" />
      {/* nav buttons */}
      <ul className={classes.buttons}>
        {/* Board button */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <div className={classes.navButton}>
              <MdOutlineSpaceDashboard size={size} />
              <h2 className={classes.navTitle}>Board</h2>
            </div>
          </NavLink>
        </li>
        {/* Analytics button */}
        <NavLink
          to="/analytics"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          <div className={classes.navButton}>
            <GoDatabase size={size} />
            <h2 className={classes.navTitle}>Analytics</h2>
          </div>
        </NavLink>
        {/* Settings button */}
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          <div className={classes.navButton}>
            <CiSettings size={size} />
            <h2 className={classes.navTitle}>Settings</h2>
          </div>
        </NavLink>
      </ul>
      {/* spacer */}
      <div className={classes.spacer}></div>
      {/* Logout Button */}
      <button className={classes.navButton} onClick={logoutHandler}>
        <LuLogOut size={size} />
        <h2 className={classes.navTitle}>Logout</h2>
      </button>
      {showLogoutModal && <LogoutModal onClose={closeModalHandler} />}
      <Toaster position="top-center" />
    </div>
  );
};

export default NavigationSection;
