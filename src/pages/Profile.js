import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useUsersContext } from "../context/UserContext";

const Profile = () => {
  const { user, dispatch } = useUsersContext();
  const { username: initialUsername, password: initialPassword } = user;
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword);
  const [editMode, setEditMode] = useState(false);

  const handleSaveChanges = () => {
    dispatch({
      type: "setUserProfile",
      value: { username, password },
    });
    setEditMode(false);
  };

  return (
    <View style={styles.profile}>
      <View style={styles.profilePic}></View>
      <View style={styles.profileInfo}>
        <Text>
          Name:{" "}
          {editMode ? (
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          ) : (
            initialUsername
          )}
        </Text>
        <Text>
          Password:{" "}
          {editMode ? (
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          ) : (
            "*****"
          )}
        </Text>

        {editMode ? (
          <Button title="Save Changes" onPress={handleSaveChanges} />
        ) : (
          <Button title="Edit" onPress={() => setEditMode(true)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profilePic: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
});

export default Profile;
