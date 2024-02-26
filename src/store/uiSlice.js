import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCreateTask: false,
  showDurationFilter: false,
  currentFilter: "This Week",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleShowCreateTask(state, action) {
      state.showCreateTask = !state.showCreateTask;
    },
    showFilter(state, action) {
      state.showDurationFilter = true;
    },
    hideFilter(state, action) {
      state.showDurationFilter = false;
    },
    toggleFilter(state, action) {
      state.showDurationFilter = !state.showDurationFilter;
    },
    changeCurrentFilter(state, action) {
      state.currentFilter = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
