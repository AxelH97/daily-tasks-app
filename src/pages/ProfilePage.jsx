import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useUsersContext } from "../context/UserContext";
import axios from "axios";
import { API_URL } from "../data/api";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { user } = useUsersContext();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${user.user.id}`);
        console.log("res", response);
        if (!response.status === 200) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.data;
        console.log("data" + data.username);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        if (error.message === "Unauthorized") {
          navigation.navigate("Login");
        }
        setLoading(false);
      }
    };

    getUserById();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData.avatarImg?.url ? (
        <Image
          source={{ uri: userData.avatarImg.url }}
          style={styles.profileImage}
        />
      ) : (
        <Text>No profile image available</Text>
      )}
      <Text style={styles.title}>{userData.username}</Text>
      <Text style={styles.title}>{userData.email}</Text>

      {/* Add more user details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default ProfilePage;
