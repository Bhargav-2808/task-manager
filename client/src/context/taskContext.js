import React, { createContext, useReducer, useContext, useEffect } from "react";
import taskService from "../services/task.service";

// Initial state
const initialState = {
  tasks: [],
  loading: true,
  error: null,
};

// Action types
export const actionTypes = {
  SET_TASKS: "SET_TASKS",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  SET_ERROR: "SET_ERROR",
};

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TASKS:
      return { ...state, tasks: action.payload, loading: false };
    case actionTypes.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case actionTypes.UPDATE_TASK:
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index === -1) return state;

      const updatedTasks = [...state.tasks];
      updatedTasks[index] = action.payload;

      return {
        ...state,
        tasks: updatedTasks,
      };

    case actionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Create TaskContext
const TaskContext = createContext();

// TaskProvider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // CRUD operations
  const addTask = async (task) => {
    try {
      const response = await taskService.createTask(task);
      dispatch({ type: actionTypes.ADD_TASK, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await taskService.updateTask(taskId, updatedTask);
      dispatch({ type: actionTypes.UPDATE_TASK, payload: response.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      dispatch({ type: actionTypes.DELETE_TASK, payload: taskId });
    } catch (error) {
      console.error(error);
    }
  };

  // Move task to a new status
  const moveTask = async (taskId, newStatus) => {
    try {
      const taskToMove = state.tasks.find((task) => task._id === taskId);

      if (!taskToMove) return;

      const updatedTask = { ...taskToMove, status: newStatus };
      const response = await taskService.updateTask(updatedTask, taskId);

      dispatch({ type: actionTypes.UPDATE_TASK, payload: response.data.data });
    } catch (error) {
      console.log(error, "error");
      console.error("Failed to move task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ ...state, addTask, updateTask, deleteTask, moveTask, dispatch }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use TaskContext
export const useTaskContext = () => useContext(TaskContext);
