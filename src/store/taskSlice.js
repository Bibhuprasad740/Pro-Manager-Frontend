import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addTaskApi,
  changeTaskStatusApi,
  deleteTaskApi,
  editTaskApi,
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
  message: null,
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
    setMessage(state, action) {
      state.message = action.payload;
    },
    updateTask(state, action) {
      const updatedTask = action.payload;
      for (let i = 0; i < state.tasks.backlog.length; i++) {
        if (state.tasks.backlog[i]._id === updatedTask._id) {
          state.tasks.backlog[i] = updatedTask;
          return;
        }
      }
      for (let i = 0; i < state.tasks.todo.length; i++) {
        if (state.tasks.todo[i]._id === updatedTask._id) {
          state.tasks.todo[i] = updatedTask;
          return;
        }
      }
      for (let i = 0; i < state.tasks.onGoing.length; i++) {
        if (state.tasks.onGoing[i]._id === updatedTask._id) {
          state.tasks.onGoing[i] = updatedTask;
          return;
        }
      }
      for (let i = 0; i < state.tasks.done.length; i++) {
        if (state.tasks.done[i]._id === updatedTask._id) {
          state.tasks.done[i] = updatedTask;
          return;
        }
      }
    },
    deleteTask(state, action) {
      const taskId = action.payload;
      for (let i = 0; i < state.tasks.backlog.length; i++) {
        if (state.tasks.backlog[i]._id === taskId) {
          state.tasks.backlog = state.tasks.backlog.filter(
            (task) => task._id !== taskId
          );
          return;
        }
      }
      for (let i = 0; i < state.tasks.todo.length; i++) {
        if (state.tasks.todo[i]._id === taskId) {
          state.tasks.todo = state.tasks.todo.filter(
            (task) => task._id !== taskId
          );
          return;
        }
      }
      for (let i = 0; i < state.tasks.onGoing.length; i++) {
        if (state.tasks.onGoing[i]._id === taskId) {
          state.tasks.onGoing = state.tasks.onGoing.filter(
            (task) => task._id !== taskId
          );
          return;
        }
      }
      for (let i = 0; i < state.tasks.done.length; i++) {
        if (state.tasks.done[i]._id === taskId) {
          state.tasks.done = state.tasks.done.filter(
            (task) => task._id !== taskId
          );
          return;
        }
      }
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
      dispatch(taskActions.setMessage("Task added successfully!"));
    } catch (error) {
      dispatch(taskActions.setError("Can not add task!"));
      console.log("Error in taskSlice.addTask", error);
    }
  };
};

export const editTask = (task, token) => {
  return async (dispatch) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(editTaskApi, task, { headers });

      if (response.status !== 200) {
        dispatch(taskActions.setError(response.data));
        console.log("axios error in taskSlice.addTask");
      }
      dispatch(taskActions.updateTask(response.data));
      dispatch(taskActions.setError(null));
      dispatch(taskActions.setMessage("Task updated successfully!"));
    } catch (error) {
      dispatch(taskActions.setError("Can not edit task!"));
      console.log("Error in taskSlice.editTask", error);
    }
  };
};

export const fetchTasks = async (api, token) => {
  let errorMessage = null;
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(api, { headers });
    if (response.status !== 200) {
      errorMessage = response.data;
    }
    // return response.data;
    return { tasks: response.data, error: errorMessage };
  } catch (error) {
    errorMessage = error.response.data;
    console.log("Error in taskSlice.fetchTasks", error);
    // return [];
    return { tasks: [], error: errorMessage };
  }
};

export const fetchTask = async (api) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.get(api, { headers });
    return response.data;
  } catch (error) {
    console.log("Error in taskSlice.fetchTask", error);
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
      dispatch(taskActions.setError(null));
      dispatch(taskActions.setMessage("Moved successfully!"));

      // will change it to a state based re-render later.. for now reload will do
      window.location.reload();
    } catch (error) {
      dispatch(taskActions.setError("Can not update status!"));
      console.log("Error in taskSlice.changeStatus", error);
    }
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

      dispatch(taskActions.deleteTask(response.data));
      dispatch(taskActions.setError(null));
      dispatch(taskActions.setMessage("Task deleted successfully!"));
    } catch (error) {
      dispatch(taskActions.setError(error.response.data));
      console.log("Error in taskSlice.deleteTask", error);
    }
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

      await axios.put(toggleCheckApi, body, { headers }).then((response) => {
        if (response.status !== 200) {
          dispatch(taskActions.setError(response.data));
          console.log(
            "Error in taskSlice.toggleTaskCheck. Toggle check failed!"
          );
        }
        dispatch(taskActions.updateTask(response.data));
        dispatch(taskActions.setError(null));
      });
    } catch (error) {
      dispatch(taskActions.setError("something went wrong!"));
      console.log("Error in taskSlice.toggleTaskCheck", error);
    }
  };
};
