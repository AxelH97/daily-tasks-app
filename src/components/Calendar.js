import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";
import { useUsersContext } from "../context/UserContext";
import { API_URL } from "../data/api";
import axios from "axios";

const CalendarComponent = () => {
  const [items, setItems] = useState({});
  const { user } = useUsersContext();
  const userId = user._id;
  console.log("userId", userId);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userId}/todos`);
        const data = response.data;
        const personalTask = data.todos;
        console.log("data", personalTask);

        const mappedData = personalTask.map((task) => {
          return {
            ...task,
            date: format(new Date(task.dueDate), "yyyy-MM-dd"),
          };
        });

        const reduced = mappedData.reduce((acc, currentItem) => {
          const { date, ...coolItem } = currentItem;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(coolItem);
          return acc;
        }, {});

        setItems(reduced);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    getData();
  }, [userId]);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Agenda items={items} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CalendarComponent;
