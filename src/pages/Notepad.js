import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import Notiz from "../pages/Notiz";
import { useUsersContext } from "../context/UserContext";
import { API_URL } from "../data/api";

const Notepad = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notizen, setNotizen] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const { user } = useUsersContext();
  const userId = user._id;

  const fetchRecentNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/notes/${userId}/recent`);
      setNotizen(response.data);
    } catch (error) {
      console.error("Error fetching recent notes:", error);
    }
  };

  useEffect(() => {
    const dateObj = new Date();
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    setCurrentDate(formattedDate);
    fetchRecentNotes();
  }, []);

  const addNotiz = async () => {
    try {
      const noteData = {
        title,
        content,
        date: currentDate,
        user: userId,
      };

      const response = await axios.post(`${API_URL}/notes/${userId}`, noteData);
      setNotizen([response.data, ...notizen]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Note</Text>
      <View>
        <Text>{currentDate}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Add Note" onPress={addNotiz} style={styles.button} />
      <ScrollView style={styles.notizenList}>
        {notizen.map((notiz, index) => (
          <Notiz
            key={index}
            title={notiz.title}
            content={notiz.content}
            date={notiz.date}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
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
    paddingBottom: 3,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  button: {
    width: 200,
    backgroundColor: "#2E7CE2",
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  notizenList: {
    marginTop: 20,
  },
});

export default Notepad;
