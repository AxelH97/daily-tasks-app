import React, { useState } from "react";
import axios from "axios";
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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../style/loginStyle";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";
import { useUsersContext } from "../context/UserContext";
import { API_URL } from "../data/api";

const Login = () => {
  const navigation = useNavigation();
  const { user, dispatchUser } = useUsersContext();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSecureEntry = () => {
    setSecureEntry((prevSecureEntry) => !prevSecureEntry);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      navigation.navigate(paths.todos);
    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 80 }}>
        <Text style={styles.title}>Daily-Tasks</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.loginText}>Log in to your account</Text>
        </View>
        <View style={{ marginTop: 70 }}>
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
          <View style={styles.passwordContainer}>
            <MaterialIcons
              style={styles.icon}
              name="lock"
              size={20}
              color="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="enter your password"
              secureTextEntry={secureEntry}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity>
              <MaterialCommunityIcons
                onPress={toggleSecureEntry}
                style={{ marginRight: 8 }}
                name={secureEntry ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>
            <Text
              onPress={() => navigation.navigate(paths.forgotPassword)}
              style={{ color: "#874CCC", fontWeight: "500" }}
            >
              Forgot Password
            </Text>
          </View>
          <View style={{ marginTop: 60 }} />
          <Pressable onPress={fetchData} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable style={{ marginTop: 15 }}>
            <Text
              onPress={() => navigation.navigate(paths.register)}
              style={styles.signupText}
            >
              Don't have an account? Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
