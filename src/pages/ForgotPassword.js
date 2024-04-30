import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../style/loginStyle";

// import { useUsersContext } from "../contexts/UserContextProvider";

const ForgotPassword = () => {
  //   const { user } = useUsersContext();

  return (
    <View style={styles.inputContainer}>
      <MaterialIcons style={styles.icon} name="email" size={20} color="gray" />
      <TextInput style={styles.input} placeholder="enter your email" />
    </View>
  );
};

export default ForgotPassword;
