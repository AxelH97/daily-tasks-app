// App.js

import React from "react";
import AppProvider from "./src/context/AppProvider";
import ToDoList from "./src/features/todo/toDoList";
import style from "./src/style/toDoListStyle";
import { View } from "react-native";

const App = () => {
  return (
    <View style={style.container}>
      <AppProvider>
        <ToDoList />
      </AppProvider>
    </View>
  );
};

export default App;
