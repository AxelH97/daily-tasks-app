import useRoutes from "../routing/routes";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function Routes() {
  const Stack = createStackNavigator();
  const routes = useRoutes();
  console.log("routes:", routes);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routes.map((route) => (
          <Stack.Screen
            key={route.path}
            name={route.path}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
