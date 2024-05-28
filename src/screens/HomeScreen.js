import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import CalendarComponent from '../components/Calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');
  const [data, setData] = useState([]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleAdd = async () => {
    const newItem = { date: selectedDate, folder: folderName, file: fileName };
    const updatedData = [...data, newItem];
    setData(updatedData);
    await AsyncStorage.setItem('calendarData', JSON.stringify(updatedData));
    setFolderName('');
    setFileName('');
  };

  const fetchData = async () => {
    const storedData = await AsyncStorage.getItem('calendarData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <CalendarComponent onDayPress={handleDayPress} />
      <Text>Selected Date: {selectedDate}</Text>
      <TextInput
        placeholder="Folder Name"
        value={folderName}
        onChangeText={setFolderName}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="File Name"
        value={fileName}
        onChangeText={setFileName}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Add" onPress={handleAdd} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>Date: {item.date}</Text>
            <Text>Folder: {item.folder}</Text>
            <Text>File: {item.file}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;