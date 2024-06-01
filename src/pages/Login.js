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
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../style/loginStyle";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";
import { useUsersContext } from "../context/UserContext";
import { API_URL } from "../data/api";
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();
  const { user, dispatchUser } = useUsersContext();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Login");

  const toggleSecureEntry = () => {
    setSecureEntry((prevSecureEntry) => !prevSecureEntry);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(text.includes("@"));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPasswordValid(text.length >= 8);
  };

  const handleAuthentication = (event) => {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      fetchData();
    } else {
      Alert.alert("Invalid input", "Please check your email and password.");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setButtonText("Logging in...");
    try {
      const payload = { userID: user._id };
      const response = await axios.post(
        `${API_URL}/users/login`,
        { email, password },
        {
          withCredentials: true,
          data: JSON.stringify(payload),
        }
      );
      if (response.status === 200) {
        const { user, accesstoken, refreshToken } = response.data;
        const userId = user._id;
        dispatchUser({
          type: "login_success",
          payload: {
            user,
            id: userId,
            accesstoken: accesstoken,
            refreshToken: refreshToken,
          },
        });
        navigation.navigate("home", {
          userId: userId,
          accesstoken: accesstoken,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed");
    } finally {
      setLoading(false);
      setButtonText("Login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 80 }}>
        <Text style={styles.title}>Daily-Tasks</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView keyboardDismissMode="on-drag">
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
                style={[styles.input, !isEmailValid && { borderColor: "red" }]}
                placeholder="enter your email"
                onChangeText={handleEmailChange}
                value={email}
                keyboardType="email-address"
              />
            </View>
            {!isEmailValid && (
              <Text style={styles.errorText}>Invalid email</Text>
            )}
            <View style={styles.passwordContainer}>
              <MaterialIcons
                style={styles.icon}
                name="lock"
                size={20}
                color="gray"
              />
              <TextInput
                style={[
                  styles.input,
                  !isPasswordValid && { borderColor: "red" },
                ]}
                placeholder="enter your password"
                secureTextEntry={secureEntry}
                onChangeText={handlePasswordChange}
                value={password}
              />
              <TouchableOpacity
                onPress={toggleSecureEntry}
                style={{ marginRight: 8 }}
              >
                <MaterialCommunityIcons
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
                justifyContent: "space-between",
              }}
            >
              <Text>Keep me logged in</Text>
              {/* <Text
                onPress={() => navigation.navigate(paths.forgotPassword)}
                style={{ color: "#874CCC", fontWeight: "500" }}
              >
                Forgot Password
              </Text> */}
            </View>
            <View style={{ marginTop: 60 }} />
            <Pressable
              onPress={handleAuthentication}
              style={styles.buttonContainer}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
