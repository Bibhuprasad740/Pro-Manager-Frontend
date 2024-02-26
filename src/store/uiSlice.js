import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCreateTask: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleShowCreateTask(state, action) {
      state.showCreateTask = !state.showCreateTask;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
