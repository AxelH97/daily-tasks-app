import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Notiz = ({ title, content }) => {
  return (
    <View style={styles.notizContainer}>
      <Text style={styles.notizTitle}>{title}</Text>
      <Text style={styles.notizContent}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notizContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  notizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2E7CE2",
  },
  notizContent: {
    fontSize: 16,
    color: "#333333",
  },
});

export default Notiz;
