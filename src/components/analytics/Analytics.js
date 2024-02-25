import React from "react";

import classes from "./Analytics.module.css";
import MainSection from "../board/main/MainSection";
import NavigationSection from "../reusables/navigation/NavigationSection";

const Analytics = () => {
  return (
    <div className={classes.analytics}>
      <NavigationSection />
      <MainSection />
    </div>
  );
};

export default Analytics;
