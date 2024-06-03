import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../image/Dt_image.png")} style={styles.image} />
      <Text style={styles.subText}>Organize your day, achieve your goals.</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.navigate(paths.register)}>
          <View style={styles.buttonContainerRegister}>
            <Text style={styles.buttonTextRegister}>Register</Text>
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
    backgroundColor: "#2E7CE2",
  },
  image: {
    width: "30%",
    height: "30%",
    resizeMode: "cover",
    aspectRatio: 1,
    opacity: 1.0,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: "#2E7CE2",
  },
  subText: {
    fontSize: 18,
    marginBottom: 20,
    color: "orange",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    width: 120,
    color: "#2E7CE2",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainerRegister: {
    borderColor: "white",
    borderWidth: 2,
    padding: 10,
    margin: 5,
    width: 120,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#2E7CE2",
    textAlign: "center",
  },
  buttonTextRegister: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default WelcomeScreen;
