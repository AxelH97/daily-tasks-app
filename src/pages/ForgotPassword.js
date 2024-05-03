import { Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../style/loginStyle";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";
import { useUsersContext } from "../context/UserContext";
import { API_URL } from "../data/api";

const ForgotPassword = () => {
  const { user } = useUsersContext();
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      console.log(data);
      navigation.navigate(paths.login);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialIcons
          style={styles.icon}
          name="email"
          size={20}
          color="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="enter your email"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <Pressable onPress={fetchData} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </>
  );
};

export default ForgotPassword;
