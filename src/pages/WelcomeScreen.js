import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate(paths.register)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Register</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(paths.login)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
