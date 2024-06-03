import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";

const Home = () => {
  const navigation = useNavigation();

  const handleNavigation = (path) => {
    navigation.navigate(path);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleNavigation(paths.calendar)}
      >
        <Image
          source={require("../image/Calendar.jpeg")}
          style={styles.image}
        />
        <Text style={styles.imageText}>Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleNavigation(paths.notepad)}
      >
        <Image source={require("../image/Notiz.jpeg")} style={styles.image} />
        <Text style={styles.imageText}>Notiz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleNavigation(paths.stopWatch)}
      >
        <Image
          source={require("../image/Stopwatch.jpeg")}
          style={styles.image}
        />
        <Text style={styles.imageText}>Stopwatch</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleNavigation(paths.timer)}
      >
        <Image source={require("../image/Timer.jpeg")} style={styles.image} />
        <Text style={styles.imageText}>Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleNavigation(paths.todos)}
      >
        <Image source={require("../image/Todo.jpeg")} style={styles.image} />
        <Text style={styles.imageText}>Todo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleNavigation(paths.statistic)}
      >
        <Image
          source={require("../image/Statistic.jpeg")}
          style={styles.image}
        />
        <Text style={styles.imageText}>Statistic</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#2E7CE2",
    padding: 10,
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "48%",
    aspectRatio: 1,
    position: "relative",
    marginBottom: 15,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    opacity: 0.8,
    borderRadius: 10,
  },
  imageText: {
    position: "absolute",
    fontSize: 24,
    top: "70%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: "white",
    padding: 5,
    zIndex: 1,
  },
});

export default Home;
