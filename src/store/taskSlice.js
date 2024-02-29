import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addTaskApi,
  changeTaskStatusApi,
  deleteTaskApi,
  toggleCheckApi,
} from "../backend_apis";

const initialTasks = {
  backlog: [],
  todo: [],
  onGoing: [],
  done: [],
};

const initialState = {
  tasks: initialTasks,
  lowCount: 0,
  moderateCount: 0,
  highCount: 0,
  dueCount: 0,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
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
    setLowCount(state, action) {
      state.lowCount = action.payload;
    },
    setModerateCount(state, action) {
      state.moderateCount = action.payload;
    },
    setHighCount(state, action) {
      state.highCount = action.payload;
    },
    setDueCount(state, action) {
      state.dueCount = action.payload;
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
            dispatch(taskActions.setError(response.data));
            return;
          }

          dispatch(taskActions.addTodo(response.data));
        })
        .catch((error) => {
          dispatch(taskActions.setError(error.response.data));
          console.log("axios error in taskSlice.addTask", error);
        });

      dispatch(taskActions.setError(null));
    } catch (error) {
      dispatch(taskActions.setError(error.response.data));
      console.log("Error in taskSlice.addTask", error);
      //   taskActions.setError(error.response.data);
    }
  };
};

export const fetchTasks = async (api, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(api, { headers });
    return response.data;
  } catch (error) {
    console.log("Error in taskSlice.fetchTasks", error);
    return [];
  }
};

export const changeStatus = (taskId, newStatus, token) => {
  return async (dispatch) => {
    try {
      const body = {
        taskId,
        newStatus,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(changeTaskStatusApi, body, {
        headers,
      });
      if (response.status !== 200) {
        dispatch(taskActions.setError(response.data));
        console.log("Error in taskSlice.changeStatus. change status failed!");
      }
      window.location.reload();

      dispatch(taskActions.setError(null));
    } catch (error) {
      dispatch(taskActions.setError("Can not update status!"));
      console.log("Error in taskSlice.changeStatus", error);
    }

    // will change it to a state based re-render later.. for now reload will do
  };
};

export const deleteTask = (id, token) => {
  return async (dispatch) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(`${deleteTaskApi}/${id}`, {
        headers,
      });

      if (response.status !== 200) {
        dispatch(taskActions.setError(response.data));
        console.log("Error in taskSlice.deleteTask. Delete task failed!");
      }
      window.location.reload();

      dispatch(taskActions.setError(null));
    } catch (error) {
      dispatch(taskActions.setError(error.response.data));
      console.log("Error in taskSlice.deleteTask", error);
    }

    // will change it to a state based re-render later.. for now reload will do
  };
};

export const toggleTaskCheck = (taskId, checklistId, checked, token) => {
  return async (dispatch) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = {
        taskId,
        checklistId,
        checked,
      };

      const response = await axios.put(toggleCheckApi, body, { headers });

      if (response.status !== 200) {
        dispatch(taskActions.setError(response.data));
        console.log("Error in taskSlice.toggleTaskCheck. Toggle check failed!");
      }
      window.location.reload();

      dispatch(taskActions.setError(null));
    } catch (error) {
      dispatch(taskActions.setError(error.response.data));
      console.log("Error in taskSlice.toggleTaskCheck", error);
    }
  };
};
