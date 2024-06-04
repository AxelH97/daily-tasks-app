// src/components/TaskItem.js
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

const TaskItem = ({ item, onMarkCompleted, onEdit }) => {
  return (
    <Pressable
      onPress={() => onEdit(item)}
      style={{
        backgroundColor: "#E0E0E0",
        padding: 10,
        borderRadius: 7,
        marginVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ flex: 1 }}>{item?.title}</Text>
        <Pressable
          onPress={() => onMarkCompleted(item?._id)}
          style={{
            backgroundColor: "#007FFF",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 5,
          }}
        >
          <Entypo name="star-outlined" size={24} color="black" />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default TaskItem;
