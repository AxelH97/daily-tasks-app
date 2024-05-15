import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Calendar from './components/Calendar';



export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <ImageBackground source={require('./src/image/d-t.png')} style={styles.container}>
      <View style={styles.container}>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});