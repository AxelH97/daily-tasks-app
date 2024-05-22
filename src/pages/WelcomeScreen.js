import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../image/d-t-removebg-preview.png")} />
      <Text style={styles.subText}>Organize your day, achieve your goals.</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.navigate(paths.register)}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Register</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(paths.login)}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e90ff",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  subText: {
    fontSize: 18,
    marginBottom: 20,
    color: "gray",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    backgroundColor: "#9763B4",
    padding: 10,
    margin: 5,
    width: 120,
    flex: 1,
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default WelcomeScreen;
