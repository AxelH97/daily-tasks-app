import React from "react";
import CalendarPage from "./src/pages/CalenderPages";
import { CalendarProvider } from "./src/context/ContextContext";

const App = () => {
  return (
    <CalendarProvider>
      <div className="App">
        <CalendarPage />
      </div>
    </CalendarProvider>
  );
};

export default App;
