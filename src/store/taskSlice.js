import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addTaskApi } from "../backend_apis";

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
    addTodo(state, action) {
      state.tasks.todo.push(action.payload);
    },
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice;

export const addTask = (task, userToken) => {
  return async (dispatch) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };
      await axios
        .post(addTaskApi, task, { headers })
        .then((response) => {
          if (response.status !== 200) {
            taskActions.setError(response.data);
            return;
          }

          dispatch(taskActions.addTodo(response.data));
        })
        .catch((error) => {
          console.log("axios error in taskSlice.addTask", error);
        });

      // update localStorage
      //   localStorage.setItem("todo");
    } catch (error) {
      console.log("Error in taskSlice.addTask", error);
      //   taskActions.setError(error.response.data);
    }
  };
};
