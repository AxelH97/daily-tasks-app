import React from "react";
import AppProvider from "./src/context/AppProvider";
import Routes from "./src/features/navigation/layout/Routes";

const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};
export default App;
