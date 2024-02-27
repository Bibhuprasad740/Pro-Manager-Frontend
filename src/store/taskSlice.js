import { createSlice } from "@reduxjs/toolkit";

const backlog = localStorage.getItem("backlog")
  ? JSON.parse(localStorage.getItem("backlog"))
  : [];
const todo = localStorage.getItem("todo")
  ? JSON.parse(localStorage.getItem("todo"))
  : [];
const onGoing = localStorage.getItem("ongoing")
  ? JSON.parse(localStorage.getItem("ongoing"))
  : [];
const done = localStorage.getItem("done")
  ? JSON.parse(localStorage.getItem("done"))
  : [];

const initialTasks = {
  backlog,
  todo,
  onGoing,
  done,
};

const initialState = {
  tasks: initialTasks,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state, action) {
      state.error = null;
    },

    // pass an object like {'backlog': backlog, 'todo': todo, ...} to taskActions.setTasks()
    setTasks(state, action) {
      state.tasks = action.payload;
    },

    setBacklog(state, action) {
      state.tasks.backlog = action.payload;
    },
    setTodo(state, action) {
      state.tasks.todo = action.payload;
    },
    setOnGoing(state, action) {
      state.tasks.onGoing = action.payload;
    },
    setDone(state, action) {
      state.tasks.done = action.payload;
    },
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice;

export const addTask = (task) => {
  return async (dispatch) => {
    // add functionality to add a task using the backend api
    // update localStorage and ui
  };
};
