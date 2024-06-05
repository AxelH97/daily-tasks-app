import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "../data/api";

const CalendarComponent = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);

  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/todos/completed/${selectedDate}`
      );
      const completedTodos = response.data.completedTodos || [];
      setTodos(completedTodos);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCompletedTodos();
  }, [selectedDate]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7CB9E8" },
        }}
      />

      <View style={{ marginTop: 20 }} />

      <View style={styles.header}>
        <Text>Completed Tasks</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </View>

      {todos.map((item, index) => (
        <Pressable style={styles.todoItem} key={index}>
          <View style={styles.todoContent}>
            <FontAwesome name="circle" size={18} color="gray" />
            <Text style={styles.todoText}>{item.title}</Text>
            <Feather name="flag" size={20} color="gray" />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  todoItem: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 7,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  todoContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  todoText: {
    flex: 1,
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default CalendarComponent;
