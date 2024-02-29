import React from "react";

import classes from "./AnalyticsElement.module.css";

import { PiDotOutlineFill } from "react-icons/pi";

const AnalyticsElement = ({ title, count }) => {
  return (
    <div className={classes.element}>
      <div className={classes.wrapper}>
        <PiDotOutlineFill color="rgb(144,196,204)" size={50} />
        <p className={classes.title}>{title}</p>
      </div>
      <p className={classes.count}>{count}</p>
    </div>
  );
};

export default AnalyticsElement;
