import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../style/loginStyle";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";

const Login = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureEntry((prevSecureEntry) => !prevSecureEntry);
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
            <TextInput style={styles.input} placeholder="enter your email" />
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
          <Pressable
            onPress={() => navigation.navigate(paths.todos)}
            style={styles.buttonContainer}
          >
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
