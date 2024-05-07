import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';

const DateComponent = ({ date, onSelectDate, selected }) => {
  const day = moment(date).format('06-05-2024') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd');
  const dayNumber = moment(date).format('D');
  const fullDate = moment(date).format('YYYY-MM-DD');

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[styles.card, selected === fullDate && { backgroundColor: "#6146c6" }]}
    >
      <Text style={[styles.big, selected === fullDate && { color: "#fff" }]}>{day}</Text>
      <View style={{ height: 10 }} />
      <Text style={[styles.medium, selected === fullDate && { color: "#fff", fontWeight: 'bold', fontSize: 24 }]}>{dayNumber}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    height: 90,
    width: 80,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  medium: {
    fontSize: 16,
  },
});

export default DateComponent;