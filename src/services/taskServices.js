// services/taskService.js

import axios from "axios";

const baseURL = "http://localhost:4444/tasks";

const taskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error("Fehler beim Abrufen der Aufgaben:", error);
      throw error;
    }
  },

  createTask: async (title) => {
    try {
      const response = await axios.post(baseURL, { title });
      return response.data;
    } catch (error) {
      console.error("Fehler beim Hinzufügen der Aufgabe:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Fehler beim Löschen der Aufgabe:", error);
      throw error;
    }
  },
};

export default taskService;
