import React from "react";
import AppProvider from "./src/context/AppProvider";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Timer from "./src/components/timer";

const App = () => {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <Timer />
      </SafeAreaProvider>
    </AppProvider>
  );
};
export default App;
