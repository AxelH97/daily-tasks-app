//src/ context/ TaskContxtProvider.jsx

import React, { createContext, useContext, useReducer } from "react";
import taskReducer from "../reducers/tasksReducer";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

const initialTasks = [];

const initialState = {
  date: null,
};

const TaskContextProvider = ({ children }) => {
  const [tasks, dispatchTasks] = useReducer(taskReducer, initialTasks);
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ tasks, dispatchTasks, state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
