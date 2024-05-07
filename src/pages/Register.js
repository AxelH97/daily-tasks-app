import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
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

const Register = () => {
  const [secureEntry, setSecureEntry] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const toggleSecureEntry = () => {
    setSecureEntry((prevSecureEntry) => !prevSecureEntry);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/signup`, {
        username: username,
        email: email,
        password: password,
      });
      const data = response.data;
      console.log(data);
      navigation.navigate(paths.login);
    } catch (error) {
      console.error(error);
      Alert.alert("Signup Failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 80 }}>
        <Text style={styles.title}>Daily-Tasks</Text>
      </View>
      <KeyboardAvoidingView behavior="padding">
        <View style={{ alignItems: "center" }}>
          <Text style={styles.loginText}>Create a new account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons style={styles.icon} name="person" size={24} color="grey" />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons
            style={styles.icon}
            name="email"
            size={20}
            color="gray"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.passwordContainer}>
          <MaterialIcons
            style={styles.icon}
            name="lock"
            size={20}
            color="gray"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={secureEntry}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={toggleSecureEntry}
            accessibilityLabel={secureEntry ? "Show Password" : "Hide Password"}
          >
            <MaterialCommunityIcons
              style={{ marginRight: 8 }}
              name={secureEntry ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 60 }} />
        <Pressable onPress={fetchData} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
