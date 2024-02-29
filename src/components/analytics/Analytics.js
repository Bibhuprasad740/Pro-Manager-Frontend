import React from "react";

import classes from "./Analytics.module.css";
import NavigationSection from "../reusables/navigation/NavigationSection";
import MainSection from "./main/MainSection";

const Analytics = () => {
  return (
    <div className={classes.analytics}>
      <NavigationSection />
      <MainSection />
    </div>
  );
};

export default Analytics;
