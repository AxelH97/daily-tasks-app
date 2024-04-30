import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import useRoutes from "../routing/routes";
import { useUsersContext } from "./../../../context/UserContext";

export default function Routes() {
  const Stack = createStackNavigator();
  const routes = useRoutes();
  const { user } = useUsersContext();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routes.map((route) => (
          <Stack.Screen
            key={route.path}
            name={route.path}
            component={route.component}
            options={({ navigation }) => {
              if (route.isProtected && !user.isLoggedIn) {
                navigation.navigate(route.redirectTo);
                return {
                  screen: route.redirectTo,
                  headerShown: false,
                };
              }
              return {
                headerShown: false,
              };
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
