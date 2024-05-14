import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import Sound from "react-native-sound";

const Timer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [timerSound, setTimerSound] = useState();

  useEffect(() => {
    Sound.setCategory("Playback");

    const soundpath = `sounds/536420__rudmer_rotteveel__electronic-timer-beeping-4x.wav`;
    const sound = new Sound(soundpath, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Sound loading failed:", error);
        return;
      }
      setTimerSound(sound);
    });

    return () => {
      if (timerSound) {
        timerSound.release();
      }
    };
  }, []);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (totalSeconds > 0) {
          setTotalSeconds((totalSeconds) => totalSeconds - 1);
        } else {
          clearInterval(interval);
          setIsActive(false);
          Alert.alert("Timer abgelaufen");
          if (timerSound) {
            timerSound.play();
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, totalSeconds, timerSound]);

  const handleStart = () => {
    const minutes = parseInt(inputMinutes);
    const seconds = parseInt(inputSeconds);
    if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0) {
      const newTotalSeconds = minutes * 60 + seconds;
      setTotalSeconds(newTotalSeconds);
      setIsActive(true);
    } else {
      Alert.alert("Bitte geben Sie eine gültige Zeit ein.");
    }
  };

  const handleStop = () => {
    setIsActive(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(totalSeconds)}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Minuten"
          keyboardType="numeric"
          value={inputMinutes}
          onChangeText={(text) => setInputMinutes(text)}
        />
        <Text style={styles.inputSeparator}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="Sekunden"
          keyboardType="numeric"
          value={inputSeconds}
          onChangeText={(text) => setInputSeconds(text)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Start" onPress={handleStart} />
        <Button title="Stop" onPress={handleStop} />
      </View>
    </View>
  );
};

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 80,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  inputSeparator: {
    fontSize: 24,
    marginHorizontal: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});

export default Timer;
