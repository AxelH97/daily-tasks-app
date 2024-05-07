import React from "react";
import TaskContextProvider from "./TasksContext";
import UserContextProvider from "./UserContext";

const AppProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <TaskContextProvider>{children}</TaskContextProvider>
    </UserContextProvider>
  );
};

export default AppProvider;
