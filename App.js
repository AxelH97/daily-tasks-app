import React from "react";
import AppProvider from "./src/context/AppProvider";
import UserContextProvider from "./src/context/UserContext";
import TaskContextProvider from "./src/context/TasksContext";
import Routes from "./src/features/navigation/layout/Routes";

const App = () => {
  return (
    <UserContextProvider>
      <TaskContextProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </TaskContextProvider>
    </UserContextProvider>
  );
};
export default App;
