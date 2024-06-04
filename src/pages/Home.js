import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { paths } from "../features/navigation/routing/paths";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ToDoList from "../features/todo/toDoList";
import Timer from "../components/timer";
import StopWatch from "../components/StopWatch";
import StatisticIndex from "../pages/StatisticIndex";
import CalendarComponent from "../components/Calendar";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Notepad from "./Notepad";

const Tab = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();

  const handleNavigation = (path) => {
    navigation.navigate(path);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleNavigation(paths.calendar)}
        >
          <Image
            source={require("../image/Calendar.jpeg")}
            style={styles.image}
          />
          <Text style={styles.imageText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleNavigation(paths.notepad)}
        >
          <Image source={require("../image/Notiz.jpeg")} style={styles.image} />
          <Text style={styles.imageText}>Notiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleNavigation(paths.stopWatch)}
        >
          <Image
            source={require("../image/Stopwatch.jpeg")}
            style={styles.image}
          />
          <Text style={styles.imageText}>Stopwatch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleNavigation(paths.timer)}
        >
          <Image source={require("../image/Timer.jpeg")} style={styles.image} />
          <Text style={styles.imageText}>Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleNavigation(paths.todos)}
        >
          <Image source={require("../image/Todo.jpeg")} style={styles.image} />
          <Text style={styles.imageText}>Todo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleNavigation(paths.statistic)}
        >
          <Image
            source={require("../image/Statistic.jpeg")}
            style={styles.image}
          />
          <Text style={styles.imageText}>Statistic</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.footerContainer}>
        <ToDoListWithBottomNavigation />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E7CE2",
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "48%",
    aspectRatio: 1,
    position: "relative",
    marginBottom: 15,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    opacity: 2.0,
    borderRadius: 10,
  },
  imageText: {
    position: "absolute",
    fontSize: 24,
    top: "70%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: "white",
    padding: 5,
    zIndex: 1,
  },
  footerContainer: {
    height: 70,
  },
});

const ToDoListWithBottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account-details"
                size={24}
                color="#7CB9E8"
              />
            ) : (
              <MaterialCommunityIcons
                name="account-details"
                size={24}
                color="black"
              />
            ),
        }}
      /> */}
      <Tab.Screen
        name="TodoList"
        component={ToDoList}
        options={{
          tabBarLabel: "Todos",
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="tasks" size={24} color="#7CB9E8" />
            ) : (
              <FontAwesome5 name="tasks" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="calendar"
        component={CalendarComponent}
        options={{
          tabBarLabel: "Calendar",
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="calendar" size={24} color="#7CB9E8" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="notepad"
        component={Notepad}
        options={{
          tabBarLabel: "Notepad",
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SimpleLineIcons name="notebook" size={24} color="#7CB9E8" />
            ) : (
              <SimpleLineIcons name="notebook" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="StopWatch"
        component={StopWatch}
        options={{
          tabBarLabel: "Stopwatch",
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="stopwatch" size={24} color="#7CB9E8" />
            ) : (
              <Entypo name="stopwatch" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Timer"
        component={Timer}
        options={{
          tabBarLabel: "Timer",
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="timer" size={24} color="#7CB9E8" />
            ) : (
              <Ionicons name="timer" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="statistic"
        component={StatisticIndex}
        options={{
          tabBarLabel: "Statistic",
          tabBarLabelStyle: { color: "black" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="linechart" size={24} color="#7CB9E8" />
            ) : (
              <AntDesign name="linechart" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ToDoListWithBottomNavigation;
