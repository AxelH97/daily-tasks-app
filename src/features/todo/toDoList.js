//src/ features/ todo/ ToDoList.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import taskService from "../../services/taskServices";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "../../style/toDoListStyle";
import { useTaskContext } from "../../context/TasksContext";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Calendar from "../../components/Calendar";
import { Entypo } from "@expo/vector-icons";
import StopWatch from "../../components/StopWatch";
import { Ionicons } from "@expo/vector-icons";
import Timer from "../../components/timer";
import Home from "../../pages/Home";
import ProfilePage from "../../pages/ProfilePage";
import { BottomModal } from "react-native-modals";
import { ModalTitle, ModalContent } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { useUsersContext } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";
import { API_URL } from "../../data/api";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const ToDoList = () => {
  const { tasks, dispatchTasks } = useTaskContext();
  const route = useRoute();
  const navigation = useNavigation();
  // console.log("userId aus route.params:", userId);
  const [todos, setTodos] = useState([]);
  const today = moment().format("MMM Do");
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const { user } = useUsersContext();
  const userId = user._id;
  const suggestions = [
    //   {
    //     id: "0",
    //     todo: "Drink Water, keep healthy",
    //   },
    //   {
    //     id: "1",
    //     todo: "Go Excercising",
    //   },
    //   {
    //     id: "2",
    //     todo: "Go to bed early",
    //   },
    //   {
    //     id: "3",
    //     todo: "Take pill reminder",
    //   },
    //   {
    //     id: "4",
    //     todo: "Go Shopping",
    //   },
    //   {
    //     id: "5",
    //     todo: "finish assignments",
    //   },
  ];
  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };
      dispatchTasks({ type: "ADD_TASK", payload: todoData });
      axios
        .post(`${API_URL}/todos/${userId}`, todoData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await getUserTodos(userId);
      setModalVisible(false);
      setTodo("");
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    getUserTodos(userId);
  }, [marked, isModalVisible]);
  const getUserTodos = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}/todos`);
      console.log(response.data.todos);
      setTodos(response.data.todos);
      const fetchedTodos = response.data.todos || [];
      const pending = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );
      const completed = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );
      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.log("error", error);
    }
  };
  const markTodoAsCompleted = async (todoId) => {
    try {
      setMarked(true);
      const response = await axios.patch(`${API_URL}/todos/${todoId}/complete`);
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("completed", completedTodos);
  console.log("pending", pendingTodos);
  return (
    <>
      <View
        style={{
          marginHorizontal: 5,
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 20, // Kleinerer Radius für den Button
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Work</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white" }}>Personal</Text>
        </Pressable>
        <Pressable
          onPress={() => setModalVisible(!isModalVisible)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
          }}
        >
          <Text style={{ fontSize: 24, color: "#007FFF", fontWeight: "bold" }}>
            Add
          </Text>
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text>Tasks to Do! {today}</Text>}
              {pendingTodos?.map((item, index) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("todos", {
                      id: item._id,
                      title: item?.title,
                      category: item?.category,
                      createdAt: item?.createdAt,
                      dueDate: item?.dueDate,
                    });
                  }}
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {/* <Entypo
                      onPress={() => markTodoAsCompleted(item?._id)}
                      name="circle"
                      size={18}
                      color="black"
                    /> */}
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <Text
                      onPress={() => markTodoAsCompleted(item?._id)}
                      style={{ fontSize: 20, marginRight: 5 }}
                    >
                      +
                    </Text>
                  </View>
                </Pressable>
              ))}
              {completedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Completed Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>
                  {completedTodos?.map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Text style={{ fontSize: 20, marginRight: 5 }}>-</Text>
                        <Text
                          style={{
                            flex: 1,
                            textDecorationLine: "line-through",
                            color: "gray",
                          }}
                        >
                          {item?.title}
                        </Text>
                        <Text style={{ fontSize: 20, marginRight: 5 }}>+</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 100, height: 100, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No Tasks for today! add a task
              </Text>
              <Pressable
                onPress={() => setModalVisible(!isModalVisible)}
                style={{ marginTop: 15 }}
              >
                <AntDesign name="pluscircle" size={30} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new task here"
              style={{
                padding: 10,
                borderColor: "#E0E0E0",
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <Text
              onPress={addTodo}
              style={{ fontSize: 12, color: "#007FFF", fontWeight: "bold" }}
            >
              Add
            </Text>
          </View>
          <Text>Choose Category</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setCategory("Work")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text>Work</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Personal")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text>Personal</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("WishList")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text>WishList</Text>
            </Pressable>
          </View>
          <Text>Some sugggestions</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {suggestions?.map((item, index) => (
              <Pressable
                onPress={() => setTodo(item?.todo)}
                style={{
                  backgroundColor: "#F0F8FF",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 25,
                }}
                key={index}
              >
                <Text style={{ textAlign: "center" }}>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};
export default ToDoList;

export const ToDoListWithBottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TodoList"
        component={ToDoList}
        options={{
          tabBarLabel: "Todos",
          tabBarLabelStyle: { color: "#7CB9E8" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="calendar" size={24} color="#7CB9E8" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="calendar"
        component={Calendar}
        options={{
          tabBarLabel: "Calendar",
          tabBarLabelStyle: { color: "#7CB9E8" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="calendar" size={24} color="#7CB9E8" />
            ) : (
              <AntDesign name="calendar" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="StopWatch"
        component={StopWatch}
        options={{
          tabBarLabel: "Stopwatch",
          tabBarLabelStyle: { color: "#7CB9E8" },
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
          tabBarLabel: "timer",
          tabBarLabelStyle: { color: "#7CB9E8" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="timer" size={24} color="#7CB9E8" />
            ) : (
              <Ionicons name="timer" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={ProfilePage}
        options={{
          tabBarLabel: "Profile",
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
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="home" size={24} color="#7CB9E8" />
            ) : (
              <MaterialCommunityIcons name="home" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
