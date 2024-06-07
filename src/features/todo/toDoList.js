
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../../data/api";
import { useTaskContext } from "../../context/TasksContext";
import { useUsersContext } from "../../context/UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { AntDesign, MaterialIcons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import TaskItem from "../../components/taskItem";
import { Agenda } from "react-native-calendars";
import { format } from "date-fns";

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
  
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskCategory, setTaskCategory] = useState("");

  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
        dueDate: selectedDate,
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

      // Update calendar items
      const mappedData = fetchedTodos.map((task) => {
        return {
          ...task,
          date: format(new Date(task.dueDate), "yyyy-MM-dd"),
        };
      });

      const reduced = mappedData.reduce((acc, currentItem) => {
        const { date, ...coolItem } = currentItem;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(coolItem);
        return acc;
      }, {});

      setItems(reduced);
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userId}/todos`);
        const data = response.data;
        const personalTask = data.todos;

        const mappedData = personalTask.map((task) => {
          return {
            ...task,
            date: format(new Date(task.dueDate), "yyyy-MM-dd"),
          };
        });

        const reduced = mappedData.reduce((acc, currentItem) => {
          const { date, ...coolItem } = currentItem;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(coolItem);
          return acc;
        }, {});

        setItems(reduced);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    getData();
  }, [userId]);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(`${API_URL}/todos/${userId}`, {
        title: taskTitle,
        category: taskCategory,
        dueDate: selectedDate, // Ensure the dueDate is set to the selected date
      });

      const newTask = response.data.todo;
      const date = newTask.dueDate;

      setItems((prevItems) => {
        const updatedItems = { ...prevItems };
        if (!updatedItems[date]) {
          updatedItems[date] = [];
        }
        updatedItems[date].push(newTask);
        return updatedItems;
      });

      setModalVisible(false);
      setTaskTitle("");
      setTaskCategory("");
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Pressable style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>All</Text>
        </Pressable>
        <Pressable style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Work</Text>
        </Pressable>
        <Pressable style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Personal</Text>
        </Pressable>
        <Pressable
          onPress={() => setModalVisible(!isModalVisible)}
          style={styles.addButton}
        >
          <AntDesign name="pluscircle" size={30} color="white" />
        </Pressable>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.taskContainer}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && (
                <Text style={styles.sectionTitle}>Tasks to Do! {today}</Text>
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
                  <View style={styles.completedImageContainer}>
                    <Image
                      style={styles.completedImage}
                      source={require("../../image/check-mark.png")}
                    />
                  </View>
                  <View style={styles.completedTasksHeader}>
                    <Text style={styles.completedTasksTitle}>Completed Tasks</Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="white" />
                  </View>
                  {completedTodos?.map((item, index) => (
                    <Pressable
                      style={styles.completedTaskItem}
                      key={index}
                    >
                      <View style={styles.completedTaskItemContent}>
                        <Pressable
                          onPress={() => deleteTodo(item._id)}
                          style={styles.deleteButton}
                        >
                          <AntDesign name="delete" size={24} color="grey" />
                        </Pressable>
                        <Text style={styles.completedTaskText}>{item?.title}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Image
                style={styles.emptyStateImage}
                source={require("../../image/list.png")}
              />
              <Text style={styles.emptyStateText}>You don't have any tasks for today!</Text>
              <Pressable
                onPress={() => setModalVisible(!isModalVisible)}
                style={styles.addButton}
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
  <ModalContent style={styles.modalContent}>
    <Text style={styles.modalTitle}>Add Task</Text>
    <View style={styles.modalInputContainer}>
      <TextInput
        value={taskTitle}
        onChangeText={setTaskTitle}
        placeholder="Task Title"
        style={styles.input}
      />
      <TextInput
        value={taskCategory}
        onChangeText={setTaskCategory}
        placeholder="Task Category"
        style={styles.input}
      />
    </View>
    <Agenda
      items={{}} // Empty items object to hide tasks
      renderItem={() => null} // Do not render any items
      onDayPress={handleDayPress}
      selected={selectedDate}
    />
    <Button title="Add Task" onPress={handleAddTask} />
    <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
        <ModalContent style={styles.editModalContent}>
          <TextInput
            value={currentTodo?.title}
            onChangeText={(text) =>
              setCurrentTodo({
                ...currentTodo,
                title: text,
              })
            }
            placeholder="Edit your task here"
            style={styles.input}
          />
          <Button title="Save" onPress={editTodo} />
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2E7CE2",
    padding: 10,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryButtonText: {
    color: "white",
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#2E7CE2",
  },
  taskContainer: {
    padding: 10,
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  completedImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  completedImage: {
    width: 100,
    height: 100,
  },
  completedTasksHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 10,
  },
  completedTasksTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  completedTaskItem: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 7,
    marginVertical: 10,
  },
  completedTaskItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  completedTaskText: {
    flex: 1,
    textDecorationLine: "line-through",
    color: "gray",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateImage: {
    width: 200,
    height: 300,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
  },
  modalContent: {
    width: "100%",
    height: "80%",
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  modalInputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  editModalContent: {
    width: "100%",
    height: 280,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 20,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default ToDoList;