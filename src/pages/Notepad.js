import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import Notiz from "../pages/Notiz";

const Notepad = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notizen, setNotizen] = useState([]);

  const handleAddNotiz = () => {
    if (title && content) {
      setNotizen([...notizen, { title, content }]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Note</Text>
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
      <Button title="Add Note" onPress={handleAddNotiz} />
      <ScrollView style={styles.notizenList}>
        {notizen.map((notiz, index) => (
          <Notiz key={index} title={notiz.title} content={notiz.content} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  notizenList: {
    marginTop: 20,
  },
});

export default Notepad;
