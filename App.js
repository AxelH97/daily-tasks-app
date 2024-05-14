import React from "react";
import AppProvider from "./src/context/AppProvider";
import Routes from "./src/features/navigation/layout/Routes";
import StopWatch from "./components/StopWatch";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <StopWatch />
      </SafeAreaProvider>
    </AppProvider>
  );
};
export default App;
