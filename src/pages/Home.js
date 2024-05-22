import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Home = () => {
  console.log("Home component rendered");
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../image/Calendar.jpeg")}
          style={styles.image}
        />
        <Text style={styles.imageText}>Calendar</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("../image/Notiz.jpeg")} style={styles.image} />
        <Text style={styles.imageText}>Notiz</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../image/Stopwatch.jpeg")}
          style={styles.image}
        />
        <Text style={styles.imageText}>Stopwatch</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("../image/Timer.jpeg")} style={styles.image} />
        <Text style={styles.imageText}>Timer</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("../image/Todo.jpeg")} style={styles.image} />
        <Text style={styles.imageText}>Todo</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../image/Statistic.jpeg")}
          style={styles.image}
        />
        <Text style={styles.imageText}>Statistic</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#5085ED",
    padding: 10,
    flexWrap: "wrap", // Wrap content to next line if exceeds width
    backgroundColor: "#5085ED",
  },
  imageContainer: {
    width: "48%", // Adjust to make space between images
    aspectRatio: 1, // Keep aspect ratio of container
    position: "relative", // Ensure positioning context for absolute elements
    marginBottom: 15,
    borderRadius: 10,
  },
  image: {
    width: "100%", // Make image fill the container
    height: "100%", // Make image fill the container
    aspectRatio: 1, // Keep aspect ratio of image
    opacity: 0.9,
    borderRadius: 10,
  },
  imageText: {
    position: "absolute",
    fontSize: 24,
    top: "70%", // Place text in the middle vertically
    left: "50%", // Place text in the middle horizontally
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: "white",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    zIndex: 1,
  },
});

export default Home;
