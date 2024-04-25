// App.js

import React from "react";
import AppProvider from "./src/context/AppProvider";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "./src/features/navigation/layout/Routes";

const Stack = createStackNavigator();
const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
