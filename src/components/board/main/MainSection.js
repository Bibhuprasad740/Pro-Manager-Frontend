import React from "react";

import classes from "./MainSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import TaskSection from "./TaskSection";
import { uiActions } from "../../../store/uiSlice";

const MainSection = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth.currentUser);
  const firstName = name.split(" ")[0];
  const date = new Date();
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const showDurationFilter = useSelector(
    (state) => state.ui.showDurationFilter
  );
  const selectedFilter = useSelector((state) => state.ui.currentFilter);

  const filterClickHandler = () => {
    dispatch(uiActions.toggleFilter());
  };

  const changeFilterHandler = (filter) => {
    dispatch(uiActions.changeCurrentFilter(filter));
    dispatch(uiActions.hideFilter());
  };

  return (
    <div className={classes.mainSection}>
      <section className={classes.headerSection}>
        <p className={classes.title}>{`Welcome! ${firstName}`}</p>
        <p className={classes.title}>{formattedDate}</p>
      </section>

      <section className={classes.subheadingSection}>
        <p className={classes.subheading}>Board</p>
        <button
          className={classes.durationFilterButton}
          onClick={filterClickHandler}
        >
          {selectedFilter}
        </button>
      </section>

      {/* Filter section */}
      {showDurationFilter && (
        <div className={classes.durationFilter}>
          <button
            className={classes.individualFilterButton}
            onClick={() => changeFilterHandler("Today")}
          >
            Today
          </button>
          <button
            className={classes.individualFilterButton}
            onClick={() => changeFilterHandler("This Week")}
          >
            This Week
          </button>
          <button
            className={classes.individualFilterButton}
            onClick={() => changeFilterHandler("This Month")}
          >
            This Month
          </button>
        </div>
      )}

      <div className={classes.wrapper}>
        <section className={classes.tasksSection}>
          <TaskSection title="Backlog" />
          <TaskSection title="Todo" isTodo={true} />
          <TaskSection title="On Going" />
          <TaskSection title="Done" />
        </section>
      </div>
    </div>
  );
};

export default MainSection;
