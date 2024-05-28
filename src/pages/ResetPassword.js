import { View, TextInput, Pressable, Text } from "react-native";
import React, { useState } from "react";
import styles from "../style/loginStyle";
import { useUsersContext } from "../context/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "../data/api";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
  const { user, dispatchUser } = useUsersContext();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  axios.defaults.withCredentials = true;
  const fetchData = async () => {
    try {
      // if (!user.user.id) {
      //   console.error("UserID is undefined");
      //   return;
      // }

      if (newPassword !== confirmPassword) {
        console.log("Passwords do not match");
        return;
      }
      const response = await axios.post(
        `${API_URL}/users/reset-password/${user.user.id}`,
        {
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }
      );
      const data = response.data;
      console.log(data.user);
      dispatchUser({ type: "reset_password", payload: data });
      navigation.navigate(paths.login);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialIcons style={styles.icon} name="lock" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          onChangeText={(text) => setNewPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons style={styles.icon} name="lock" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <Pressable onPress={fetchData} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </Pressable>
    </>
  );
};

export default ResetPassword;
