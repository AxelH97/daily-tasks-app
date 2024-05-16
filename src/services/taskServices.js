// services/taskService.js

import axios from "axios";
import { API_URL } from "../data/api";

const taskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      throw error;
    }
  },

  createTask: async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      return response.data;
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting tasks:", error);
      throw error;
    }
  },

  updateTask: async (id, updatedTitle) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title: updatedTitle,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating tasks:", error);
      throw error;
    }
  },
};

export default taskService;
