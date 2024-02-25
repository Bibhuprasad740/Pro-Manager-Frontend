import React from "react";

import classes from "./Board.module.css";

import MainSection from "./main/MainSection";
import NavigationSection from "../reusables/navigation/NavigationSection";

const Board = () => {
  return (
    <div className={classes.board}>
      <NavigationSection />
      <MainSection />
    </div>
  );
};

export default Board;
