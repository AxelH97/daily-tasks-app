import React, { useState, useEffect, useReducer } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import taskReducer from "../../reducers/tasksReducer";
import styles from "../../style/toDoListStyle";

const ToDoList = () => {
  const [taskInput, setTaskInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const [tasks, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    console.log("ToDoList neu gerendert:", tasks);
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      dispatch({ type: "ADD_TASK", payload: taskInput });
      setTaskInput("");
    }
  };

  const deleteTask = (index) => {
    dispatch({ type: "DELETE_TASK", payload: index });
  };

  const editTask = (index, newText) => {
    setEditingIndex(index);
    setEditedTask(newText);
  };

  const saveEditedTask = () => {
    dispatch({
      type: "EDIT_TASK",
      payload: { index: editingIndex, editedTask: editedTask },
    });
    setEditingIndex(null);
    setEditedTask("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>
      <TextInput
        style={styles.input}
        value={taskInput}
        onChangeText={(text) => setTaskInput(text)}
        placeholder="Enter task"
      />
      <Pressable onPress={addTask} style={styles.button}>
        <Text>Add Task</Text>
      </Pressable>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <ListItem
            key={index.toString()}
            title={
              index === editingIndex ? (
                <TextInput
                  style={styles.input}
                  value={editedTask}
                  onChangeText={(text) => setEditedTask(text)}
                />
              ) : (
                item
              )
            }
            rightElement={
              <View style={styles.buttons}>
                {index === editingIndex ? (
                  <Pressable onPress={saveEditedTask} style={styles.button}>
                    <Text>Save</Text>
                  </Pressable>
                ) : (
                  <>
                    <Pressable
                      onPress={() => deleteTask(index)}
                      style={styles.button}
                    >
                      <Text>Delete</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => editTask(index, item)}
                      style={styles.button}
                    >
                      <Text>Edit</Text>
                    </Pressable>
                  </>
                )}
              </View>
            }
            bottomDivider
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ToDoList;
