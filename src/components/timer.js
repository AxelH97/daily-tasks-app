import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import styles from "../style/timerStyle";

const Timer = () => {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds((parseInt(seconds) - 1).toString());
        } else {
          if (parseInt(minutes) === 0 && parseInt(hours) === 0) {
            clearInterval(interval);
            setTimerOn(false);
          } else {
            if (parseInt(minutes) === 0) {
              setMinutes("59");
              setHours((parseInt(hours) - 1).toString());
            } else {
              setMinutes((parseInt(minutes) - 1).toString());
            }
            setSeconds("59");
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, hours, minutes, seconds]);

  const startTimer = () => {
    setTimerOn(true);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Stunden"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />
        <Text style={styles.separator}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="Minuten"
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
        />
        <Text style={styles.separator}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="Sekunden"
          keyboardType="numeric"
          value={seconds}
          onChangeText={setSeconds}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startTimer} />
        <Button title="Stop" onPress={stopTimer} />
      </View>
      <View>
        <Text style={styles.timer}>{`${hours}:${minutes}:${seconds}`}</Text>
      </View>
    </View>
  );
};

export default Timer;
