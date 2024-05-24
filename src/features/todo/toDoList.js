//src/ features/ todo/ ToDoList.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import taskService from "../../services/taskServices";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "../../style/toDoListStyle";
import { useTaskContext } from "../../context/TasksContext";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Calendar from "../../components/Calendar";
import Profile from "../../pages/Profile";
import { Entypo } from "@expo/vector-icons";
import StopWatch from "../../components/StopWatch";
import { Ionicons } from "@expo/vector-icons";
import Timer from "../../components/timer";
import Home from "../../pages/Home";
import ProfilePage from "../../pages/ProfilePage";

const Tab = createBottomTabNavigator();

export const ToDoList = () => {
  const [taskInput, setTaskInput] = useState("");
  const [editingIndex, setEditingIndex] = useState("");
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
    setEditedTask(newText.title);
  };

  console.log("editingIndex:", editingIndex);
  console.log("editedTask:", editedTask);

  const saveEditedTask = async () => {
    try {
      // Überprüfen, ob editingIndex nicht null ist
      if (editingIndex !== null) {
        // Überprüfen, ob editedTask nicht leer ist
        if (editedTask.trim() !== "") {
          await taskService.updateTask(tasks[editingIndex]._id, editedTask);
          dispatchTasks({
            type: "EDIT_TASK",
            payload: { index: editingIndex, editedTask: editedTask },
          });
        } else {
          console.error("Der bearbeitete Task-Titel ist leer.");
        }
      } else {
        console.error("Der Index des bearbeiteten Tasks ist null.");
      }
      // Setzen von editingIndex und editedTask unabhängig von den Bedingungen zurück
      setEditingIndex("");
      setEditedTask("");
    } catch (error) {
      console.error("Fehler beim Speichern der bearbeiteten Aufgabe:", error);
    }
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

const ToDoListWithBottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TodoList"
        component={ToDoList}
        options={{
          tabBarLabel: "Todos",
          tabBarLabelStyle: { color: "#7CB9E8" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="calendar" size={24} color="#7CB9E8" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="calendar"
        component={Calendar}
        options={{
          tabBarLabel: "Calendar",
          tabBarLabelStyle: { color: "#7CB9E8" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="calendar" size={24} color="#7CB9E8" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="StopWatch"
        component={StopWatch}
        options={{
          tabBarLabel: "Stopwatch",
          tabBarLabelStyle: { color: "#7CB9E8" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="stopwatch" size={24} color="#7CB9E8" />
            ) : (
              <Entypo name="stopwatch" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Timer"
        component={Timer}
        options={{
          tabBarLabel: "timer",
          tabBarLabelStyle: { color: "#7CB9E8" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="timer" size={24} color="#7CB9E8" />
            ) : (
              <Ionicons name="timer" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={ProfilePage}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account-details"
                size={24}
                color="#7CB9E8"
              />
            ) : (
              <MaterialCommunityIcons
                name="account-details"
                size={24}
                color="black"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="home" size={24} color="#7CB9E8" />
            ) : (
              <MaterialCommunityIcons name="home" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ToDoListWithBottomNavigation;
