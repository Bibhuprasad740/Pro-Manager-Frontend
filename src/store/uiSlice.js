import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCreateTask: false,
  showDurationFilter: false,
  currentFilter: "This Week",
  backlogCollapseState: false,
  todoCollapseState: false,
  ongoingCollapseState: false,
  doneCollapseState: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleShowCreateTask(state) {
      state.showCreateTask = !state.showCreateTask;
    },
    showFilter(state) {
      state.showDurationFilter = true;
    },
    hideFilter(state) {
      state.showDurationFilter = false;
    },
    toggleFilter(state) {
      state.showDurationFilter = !state.showDurationFilter;
    },
    changeCurrentFilter(state, action) {
      state.currentFilter = action.payload;
    },
    collapseBacklog(state) {
      state.backlogCollapseState = true;
    },
    collapseTodo(state) {
      state.todoCollapseState = true;
    },
    collapseOngoing(state) {
      state.ongoingCollapseState = true;
    },
    collapseDone(state) {
      state.doneCollapseState = true;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
