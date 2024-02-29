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
import { useSelector } from "react-redux";

const size = 25;

const NavigationSection = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const closeModalHandler = () => {
    setShowLogoutModal(false);
  };

  const logoutHandler = () => {
    setShowLogoutModal(true);
  };

  const errorTextTask = useSelector((state) => state.task.error);
  const errorTextAuth = useSelector((state) => state.auth.error);
  useEffect(() => {
    if (errorTextTask) {
      toast.error(errorTextTask);
    }
    if (errorTextAuth) {
      toast.error(errorTextAuth);
    }
  }, [errorTextTask, errorTextAuth]);

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
