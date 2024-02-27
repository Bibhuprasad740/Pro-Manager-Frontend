import React, { useState } from "react";

import classes from "./CheckList.module.css";

import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

const size = 15;

const CheckList = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheckedHandler = () => {
    setChecked((state) => !state);
  };
  return (
    <div className={classes.checklist}>
      {checked && (
        <button onClick={toggleCheckedHandler}>
          <ImCheckboxChecked size={size} color="#17A2B8" />
        </button>
      )}
      {!checked && (
        <button onClick={toggleCheckedHandler}>
          <ImCheckboxUnchecked size={size} color="rgb(183, 183, 183)" />
        </button>
      )}
      <p className={classes.content}>
        Add Navigation and lorem ipsum dolar sit!
      </p>
    </div>
  );
};

export default CheckList;
