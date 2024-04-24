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
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import styles from "../style/loginStyle";

const Register = () => {
  const [secureEntry, setSecureEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureEntry((prevSecureEntry) => !prevSecureEntry);
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
          <TextInput style={styles.input} placeholder="Enter your name" />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons
            style={styles.icon}
            name="email"
            size={20}
            color="gray"
          />
          <TextInput style={styles.input} placeholder="Enter your email" />
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
        <Pressable style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
