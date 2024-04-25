//src/ context/ TaskContxtProvider.jsx

import React, { createContext, useContext, useReducer } from "react";
import taskReducer from "../reducers/tasksReducer";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

const initialTasks = [];

const TaskContextProvider = ({ children }) => {
  const [tasks, dispatchTasks] = useReducer(taskReducer, initialTasks);

  return (
    <TaskContext.Provider value={{ tasks, dispatchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
