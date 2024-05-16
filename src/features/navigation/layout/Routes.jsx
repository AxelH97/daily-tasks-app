import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import useRoutes from "../routing/routes";
import { useUsersContext } from "./../../../context/UserContext";

export default function Routes() {
  const Stack = createStackNavigator();
  const routes = useRoutes();
  const { user } = useUsersContext();
  console.log("Route:", routes);

  return (
    <NavigationContainer>
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
              if (route.isProtected && !user.isLoggedIn && user.email !== "") {
                return {
                  screen: route.redirectTo,
                  // headerShown: false,
                };
              }
              // return {
              //   headerShown: false,
              // };
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
