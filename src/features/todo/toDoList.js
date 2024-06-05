//src/ features/ todo/ ToDoList.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../../data/api";
import { useTaskContext } from "../../context/TasksContext";
import { useUsersContext } from "../../context/UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import TaskItem from "../../components/taskItem";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ToDoList = () => {
  const { tasks, dispatchTasks } = useTaskContext();
  const route = useRoute();
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const today = moment().format("MMM Do");
  const [isModalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const { user } = useUsersContext();
  const userId = user._id;
  const suggestions = [];

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

  const editTodo = async () => {
    try {
      const todoData = {
        title: currentTodo.title,
        category: currentTodo.category,
      };
      dispatchTasks({
        type: "EDIT_TASK",
        payload: { index: currentTodo._id, editedTask: todoData },
      });
      axios
        .put(`${API_URL}/todos/${currentTodo._id}`, todoData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error", error);
        });
      await getUserTodos(userId);
      setEditModalVisible(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      await getUserTodos(userId);
    } catch (error) {
      console.error("error", error);
    }
  };

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

  useEffect(() => {
    getUserTodos(userId);
  }, [marked, isModalVisible, editModalVisible]);

  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setEditModalVisible(true);
  };

  console.log("completed", completedTodos);
  console.log("pending", pendingTodos);

  return (
    <>
      <View
        style={{
          // marginTop: 25,
          marginHorizontal: 5,
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#2E7CE2",
        }}
      >
        <Pressable
          style={{
            // backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>All</Text>
        </Pressable>
        <Pressable
          style={{
            // backgroundColor: "#7CB9E8",
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
            // backgroundColor: "#7CB9E8",
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
          <Text style={{ fontSize: 24, color: "#black", fontWeight: "bold" }}>
            <AntDesign name="pluscircle" size={30} color="white" />
          </Text>
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#2E7CE2" }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && (
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  Tasks to Do! {today}
                </Text>
              )}
              {pendingTodos?.map((item, index) => (
                <TaskItem
                  key={index}
                  item={item}
                  onMarkCompleted={markTodoAsCompleted}
                  onEdit={openEditModal}
                />
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
                      style={{ width: 100, height: 100, color: "white" }}
                      source={require("../../image/check-mark.png")}
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
                        <Pressable
                          onPress={() => deleteTodo(item._id)}
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 5,
                          }}
                        >
                          <Text style={{ color: "white" }}>
                            <AntDesign name="delete" size={24} color="grey" />
                          </Text>
                        </Pressable>
                        <Text
                          style={{
                            flex: 1,
                            textDecorationLine: "line-through",
                            color: "gray",
                          }}
                        >
                          {item?.title}
                        </Text>
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
              }}
            >
              <Image
                style={{ width: 200, height: 300 }}
                source={require("../../image/list.png")}
              />
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                You don't have any tasks for today!
              </Text>
              <Pressable
                onPress={() => setModalVisible(!isModalVisible)}
                style={{ marginTop: 15 }}
              >
                <AntDesign name="pluscircle" size={30} color="white" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomModal
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <ModalContent
          style={{
            width: "100%",
            height: 220,
            backgroundColor: "#F2F2F2",
            borderRadius: 20,
          }}
        >
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new task here"
              style={{
                padding: 12,
                borderColor: "#D3D3D3",
                borderWidth: 1,
                borderRadius: 10,
                flex: 1,
              }}
            />
            <TouchableOpacity
              onPress={addTodo}
              style={{
                fontSize: 12,
                color: "#007FFF",
                fontWeight: "bold",
              }}
            >
              <MaterialCommunityIcons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </ModalContent>
      </BottomModal>

      <BottomModal
        visible={editModalVisible}
        onTouchOutside={() => setEditModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              value={currentTodo?.title}
              onChangeText={(text) =>
                setCurrentTodo({
                  ...currentTodo,
                  title: text,
                })
              }
              placeholder="Edit your task here"
              style={{
                padding: 10,
                borderColor: "#E0E0E0",
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <Text
              onPress={editTodo}
              style={{
                fontSize: 12,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Save
            </Text>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default ToDoList;
