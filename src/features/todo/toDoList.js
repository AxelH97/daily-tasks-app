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
  StyleSheet,
  Button,
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
import { SimpleLineIcons } from "@expo/vector-icons";
import { Modal } from "react-native";

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
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteModalVisible, setNoteModalVisible] = useState(false);
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

  const addNotizToTask = async () => {
    try {
      const noteData = {
        title: noteTitle,
        content: noteContent,
        user: userId,
      };
      const updatedTask = {
        ...todos[0],
        notes: [noteData, ...(todos[0].notes || [])],
      };
      await axios.put(`${API_URL}notes/tasks/${todos[0]._id}`, updatedTask);
      const updatedTodos = todos.map((task, index) => {
        if (index === 0) {
          return updatedTask;
        }
        return task;
      });
      setTodos(updatedTodos);
      setNoteTitle("");
      setNoteContent("");
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding note to task:", error);
    }
  };

  const showOtherModal = () => {
    setModalVisible(true);
  };

  const showNoteModal = () => {
    setNoteModalVisible(true);
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
            // borderRadius: 20,
          }}
        >
          <View style={styles.modalContent}>
            <View style={styles.rowContainer}>
              <TextInput
                style={styles.input}
                placeholder="Add a task"
                value={todo}
                onChangeText={setTodo}
              />
              <TouchableOpacity onPress={addTodo} style={styles.sendButton}>
                <MaterialCommunityIcons name="send" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
                onPress={showNoteModal}
              >
                <SimpleLineIcons name="notebook" size={24} color="black" />
                <Text style={{ marginLeft: 5 }}>Note</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 5,
                }}
                onPress={showNoteModal}
              >
                <AntDesign name="calendar" size={24} color="black" />
                <Text style={{ marginLeft: 5 }}>Calendar</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <Text>Category</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Pressable
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                  backgroundColor: "orange",
                }}
              >
                <Text style={{ color: "black" }}>All</Text>
              </Pressable>
              <Pressable
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                  backgroundColor: "green",
                }}
              >
                <Text style={{ color: "black" }}>Work</Text>
              </Pressable>
              <Pressable
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 5,
                  backgroundColor: "red",
                }}
              >
                <Text style={{ color: "black" }}>Personal</Text>
              </Pressable>
            </View>
          </View>
        </ModalContent>
      </BottomModal>

      <Modal visible={editModalVisible} transparent={true} animationType="fade">
        <View style={styles.popupModalContainer}>
          <View style={styles.popupModalContent}>
            <Text style={{ fontWeight: "bold" }}>Edit Task</Text>
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
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingBottom: 3,
                marginTop: 20,
                borderBottomWidth: 2,
                borderBottomColor: "gray",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={{ color: "black" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={editTodo} style={{ marginRight: 10 }}>
                <Text style={{ color: "black", fontSize: 14 }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={noteModalVisible} transparent={true} animationType="fade">
        <View style={styles.popupModalContainer}>
          <View style={styles.popupModalContent}>
            <Text style={styles.header}>Note</Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={noteTitle}
              onChangeText={setNoteTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Content"
              value={noteContent}
              onChangeText={setNoteContent}
              multiline
            />
            <Button title="Add Note" onPress={addNotizToTask} />
            <TouchableOpacity
              onPress={() => {
                setNoteModalVisible(false);
                showOtherModal();
              }}
            >
              <Text style={{ color: "black" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  popupModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupModalContent: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7CE2",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingBottom: 3,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  button: {
    width: "100%",
    backgroundColor: "#2E7CE2",
    borderRadius: 6,
    padding: 10,
    marginTop: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  iconText: {
    marginLeft: 5,
  },
  sendButton: {
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingBottom: 3,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default ToDoList;
