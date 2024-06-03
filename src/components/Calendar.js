import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useUsersContext } from '../context/UserContext';

const CalendarComponent = () => {
  const [items, setItems] = useState({});
  const { user } = useUsersContext();
  const userId = user._id;
  console.log("userId", userId);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:4444/users/${userId}/todos`);
      const data = await response.json();
      const personalTask = data.todos;
      console.log("data", personalTask);

      const mappedData = personalTask.map((task) => {
        return {
          ...task,
          date: format(new Date(task.dueDate), 'yyyy-MM-dd'),
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
    };

    getData();
  }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.title}</Text>
        <Text>{item.status}</Text>
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
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default CalendarComponent;
