import React from "react";

import classes from "./NavigationSection.module.css";

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";

import logo from "../../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const size = 30;

const NavigationSection = () => {
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
              <h2 className={classes.buttonTitle}>Board</h2>
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
            <h2 className={classes.buttonTitle}>Analytics</h2>
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
            <h2 className={classes.buttonTitle}>Settings</h2>
          </div>
        </NavLink>
      </ul>
      {/* spacer */}
      <div className={classes.spacer}></div>
      {/* Logout Button */}
      <div className={classes.navButton}>
        <LuLogOut size={size} />
        <h2 className={classes.buttonTitle}>Logout</h2>
      </div>
    </div>
  );
};

export default NavigationSection;
