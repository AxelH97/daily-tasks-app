//src/ features/ todo/ ToDoList.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import taskService from "../../services/taskServices";

import styles from "../../style/toDoListStyle";
import { useTaskContext } from "../../context/TasksContext";

const ToDoList = () => {
  const [taskInput, setTaskInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const { tasks, dispatchTasks } = useTaskContext();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tasksData = await taskService.getAllTasks();
      console.log("tasksData:", tasksData);

      dispatchTasks({ type: "SET_TASKS", payload: tasksData });
    } catch (error) {
      console.error("Fehler beim Abrufen der Aufgaben:", error);
    }
  };

  const addTask = async () => {
    if (taskInput.trim() !== "") {
      try {
        await taskService.createTask(taskInput);
        setTaskInput("");
        fetchData();
      } catch (error) {
        console.error("Fehler beim Hinzufügen der Aufgabe:", error);
      }
    }
  };

  // Loggen Sie die tasks-Daten, um zu überprüfen, ob sie vorhanden sind
  console.log("tasks:", tasks);

  const deleteTask = (index) => {
    if (tasks[index]) {
      taskService.deleteTask(tasks[index]._id);
      dispatchTasks({ type: "DELETE_TASK", payload: index });
    }
  };

  const editTask = (index, newText) => {
    setEditingIndex(index);
    setEditedTask(newText);
  };

  const saveEditedTask = () => {
    dispatchTasks({
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

      {
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <View style={styles.task} key={item._id}>
              {index === editingIndex ? (
                <TextInput
                  style={[styles.input, styles.listItemText]} // Stil für bearbeitbares Textfeld
                  value={editedTask}
                  onChangeText={(text) => setEditedTask(text)}
                />
              ) : (
                <Text style={styles.listItemText}>{item.title}</Text> // Stil für Listenelement
              )}
              <View style={styles.buttons}>
                {index === editingIndex ? (
                  <Pressable
                    onPress={saveEditedTask}
                    style={[styles.button, styles.saveButton]}
                  >
                    <Text>Save</Text>
                  </Pressable>
                ) : (
                  <>
                    <Pressable
                      onPress={() => deleteTask(index)}
                      style={[styles.button, styles.deleteButton]} // Stil für Delete-Button
                    >
                      <Text>Delete</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => editTask(index, item)}
                      style={[styles.button, styles.editButton]} // Stil für Edit-Button
                    >
                      <Text>Edit</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      }
    </View>
  );
};

export default ToDoList;
