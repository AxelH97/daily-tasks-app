import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import useRoutes from "../routing/routes";
import { useUsersContext } from "./../../../context/UserContext";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerContent = () => {
  return null;
};

export default function Routes() {
  const routes = useRoutes();
  const { user } = useUsersContext();
  console.log("Route:", routes);

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Profile">
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
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
