import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Daily-Tasks</Text>
      <TouchableOpacity onPress={() => navigation.navigate(paths.register)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(paths.login)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Hintergrundfarbe
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333", // Textfarbe
  },
  buttonContainer: {
    flexDirection: "row", // Anordnung der Buttons nebeneinander
    justifyContent: "center", // Zentrieren der Buttons horizontal
    alignItems: "center", // Zentrieren der Buttons vertikal
    width: "80%", // Breite des Containers
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.02)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily:
      'system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 1.25,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 12,
    textAlign: "center",
    textDecoration: "none",
    transition: "all 250ms",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
    width: "auto",
  },
});

export default WelcomeScreen;
