import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import useRoutes from "../../../features/navigation/routing/routes.js";
import { useUsersContext } from "../../../context/UserContext.jsx";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../data/api";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { paths } from "../../navigation/routing/paths.js";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerContent = () => {
  const { user, dispatchUser } = useUsersContext();
  const navigation = useNavigation();

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
      const response = await axios.delete(`${API_URL}/users/${user.user.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        dispatchUser({ type: "logout" });
        navigation.navigate(paths.welcomescreen);
      } else {
        Alert.alert("Delete Account Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Delete Account Failed", error.message);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ padding: 10, fontSize: 16 }}>Logout</Text>
        <MaterialIcons name="logout" size={16} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteAccount}>
        <Text style={{ padding: 10, fontSize: 16 }}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Routes() {
  const routes = useRoutes();
  const { user } = useUsersContext();

  console.log("Route:", routes);

  return (
    <NavigationContainer>
      {/* {user.isLoggedIn ? ( */}
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Menu">
          {() => (
            <Stack.Navigator>
              {routes.map((route) => (
                <Stack.Screen
                  key={route.path}
                  name={route.path}
                  component={route.component}
                  options={({ navigation }) => {
                    console.log("Route options for:", route.path);
                    console.log("route:", route);
                    console.log("user.isLoggedIn:", user.isLoggedIn);
                    if (
                      route.isProtected &&
                      !user.isLoggedIn &&
                      user.email !== ""
                    ) {
                      // Navigate to the redirectTo path if user is not logged in
                      navigation.navigate(route.redirectTo);
                    }
                    return {
                      headerShown: false,
                    };
                  }}
                />
              ))}
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
      {/* ) : (
        <Stack.Navigator>
          {routes.map((route) => (
            <Stack.Screen
              key={route.path}
              name={route.path}
              component={route.component}
              options={({ navigation }) => {
                console.log("Route options for:", route.path);
                console.log("route:", route);
                console.log("user.isLoggedIn:", user.isLoggedIn);
                if (
                  route.isProtected &&
                  !user.isLoggedIn &&
                  user.email !== ""
                ) {
                  // Navigate to the redirectTo path if user is not logged in
                  navigation.navigate(route.redirectTo);
                }
                return {
                  headerShown: false,
                };
              }}
            />
          ))}
        </Stack.Navigator>
      )} */}
    </NavigationContainer>
  );
}
