import React from "react";

import classes from "./Settings.module.css";
import NavigationSection from "../reusables/navigation/NavigationSection";
import MainSection from "./main/MainSection";

const Settings = () => {
  return (
    <div className={classes.settings}>
      <NavigationSection />
      <MainSection />
    </div>
  );
};

export default Settings;
