import React from "react";
import TaskContextProvider from "./src/context/TasksContext";
import ToDoList from "./src/features/todo/toDoList";
import style from "./src/style/toDoListStyle";
import { View } from "react-native-web";

const App = () => {
  return (
    <View style={style.container}>
      <TaskContextProvider>
        <ToDoList />
      </TaskContextProvider>
    </View>
  );
};

export default App;
