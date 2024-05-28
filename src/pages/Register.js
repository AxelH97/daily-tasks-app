import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Platform } from "react-native";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import styles from "../style/loginStyle";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";
import { API_URL } from "../data/api";
import axios from "axios";
import { useUsersContext } from "../context/UserContext";

const Register = () => {
  const { dispatchUser } = useUsersContext();
  const [secureEntry, setSecureEntry] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Register");
  const navigation = useNavigation();

  const toggleSecureEntry = () => {
    setSecureEntry((prevSecureEntry) => !prevSecureEntry);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    setIsUsernameValid(text.length >= 3); // Basic username validation
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(text.includes("@")); // Basic email validation
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPasswordValid(text.length >= 8); // Basic password validation
  };

  const fetchData = async () => {
    setLoading(true);
    setButtonText("Registering...");
    try {
      const response = await axios.post(`${API_URL}/users/signup`, {
        username,
        email,
        password,
      });
      const data = response.data;
      console.log(data);
      dispatchUser({ type: "REGISTER", payload: data.user });
      navigation.navigate(paths.login);
    } catch (error) {
      console.error(error);
      Alert.alert("Signup Failed");
    } finally {
      setLoading(false);
      setButtonText("Register");
    }
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    if (isUsernameValid && isEmailValid && isPasswordValid) {
      fetchData();
    } else {
      Alert.alert(
        "Invalid input",
        "Please check your username, email, and password."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 80 }}>
        <Text style={styles.title}>Daily-Tasks</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView keyboardDismissMode="on-drag">
          <View style={{ alignItems: "center" }}>
            <Text style={styles.loginText}>Create a new account</Text>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              style={styles.icon}
              name="person"
              size={24}
              color="grey"
            />
            <TextInput
              style={[styles.input, !isUsernameValid && { borderColor: "red" }]}
              placeholder="Enter your name"
              onChangeText={handleUsernameChange}
              value={username}
            />
          </View>
          {!isUsernameValid && (
            <Text style={styles.errorText}>
              Username must be at least 3 characters
            </Text>
          )}
          <View style={styles.inputContainer}>
            <MaterialIcons
              style={styles.icon}
              name="email"
              size={20}
              color="gray"
            />
            <TextInput
              style={[styles.input, !isEmailValid && { borderColor: "red" }]}
              placeholder="Enter your email"
              onChangeText={handleEmailChange}
              value={email}
            />
          </View>
          {!isEmailValid && <Text style={styles.errorText}>Invalid email</Text>}
          <View style={styles.passwordContainer}>
            <MaterialIcons
              style={styles.icon}
              name="lock"
              size={20}
              color="gray"
            />
            <TextInput
              style={[styles.input, !isPasswordValid && { borderColor: "red" }]}
              placeholder="Enter your password"
              secureTextEntry={secureEntry}
              onChangeText={handlePasswordChange}
              value={password}
            />
            <TouchableOpacity
              onPress={toggleSecureEntry}
              accessibilityLabel={
                secureEntry ? "Show Password" : "Hide Password"
              }
            >
              <MaterialCommunityIcons
                style={{ marginRight: 8 }}
                name={secureEntry ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          {!isPasswordValid && (
            <Text style={styles.errorText}>
              Password must be at least 8 characters
            </Text>
          )}
          <View style={{ marginTop: 60 }} />
          <Pressable
            onPress={handleRegistration}
            style={styles.buttonContainer}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
