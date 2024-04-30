import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useCalendar } from "../context/ContextContext";

const Calendar = () => {
  const { selectedDate } = useCalendar();

  return (
    <View>
      <Text>{selectedDate.toDateString()}</Text>
      
    </View>
  );
};


export default Calendar;
