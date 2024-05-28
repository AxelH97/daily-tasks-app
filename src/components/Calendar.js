
import React from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ onDayPress }) => {
  return (
    <Calendar
      onDayPress={onDayPress}
      markedDates={{
        '2022-05-16': { selected: true, marked: true, selectedColor: 'blue' },
      }}
    />
  );
};

export default CalendarComponent;

