import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import useRoutes from "../../../features/navigation/routing/routes.js";
import { useUsersContext } from "../../../context/UserContext.jsx";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../data/api";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { ModalPortal } from "react-native-modals";
import { paths } from "../../navigation/routing/paths.js";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerContent = () => {
  const { user, dispatchUser } = useUsersContext();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${user._id}`);
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          throw new Error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
        if (error.message === "Unauthorized") {
          navigation.navigate("Login");
        }
      }
    };

    if (user && user._id) {
      getUserById();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/users/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        dispatchUser({ type: "logout" });
        navigation.navigate(paths.welcomescreen);
      } else {
        Alert.alert("Logout Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`${API_URL}/users/${user._id}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        dispatchUser({ type: "logout" });
        navigation.navigate("WelcomeScreen");
      } else {
        Alert.alert("Delete Account Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Delete Account Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.profileContainer}>
          {userData.avatarImg?.url ? (
            <Image
              source={{ uri: userData.avatarImg.url }}
              style={styles.avatar}
            />
          ) : (
            <Text>No profile image available</Text>
          )}
          <Text style={styles.username}>{userData.username}</Text>
        </View>
      )}
      {user.isLoggedIn && (
        <>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
            <MaterialIcons name="logout" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAccount} style={styles.button}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
const StackNavigator = () => {
  const routes = useRoutes();
  const { user } = useUsersContext();
  return (
    <Stack.Navigator>
      {routes.map((route) => (
        <Stack.Screen
          key={route.path}
          name={route.path}
          component={route.component}
          options={({ navigation }) => {
            if (route.isProtected && !user.isLoggedIn && user.email !== "") {
              navigation.navigate(route.redirectTo);
            }
            return {
              headerShown: false,
            };
          }}
        />
      ))}
    </Stack.Navigator>
  );
};
export default function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="StackNavigator"
          component={StackNavigator}
          options={{ title: "" }}
        />
      </Drawer.Navigator>
      <ModalPortal />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    marginRight: 10,
  },
});
