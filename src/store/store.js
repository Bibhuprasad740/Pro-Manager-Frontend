import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uiSlice from "./uiSlice";
import taskSlice from "./taskSlice";
import checklistSlice from "./checklistSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    task: taskSlice.reducer,
    checklist: checklistSlice.reducer,
  },
});

export default store;
