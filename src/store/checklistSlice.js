import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checklists: localStorage.getItem("checklist")
    ? JSON.parse(localStorage.getItem("checklist"))
    : null,
};

const checklistSlice = createSlice({
  name: "checklist",
  initialState: initialState,
  reducers: {
    setChecklist(state, action) {
      state.checklists = action.payload;
    },
  },
});

export const checklistActions = checklistSlice.reducer;

export default checklistSlice;
