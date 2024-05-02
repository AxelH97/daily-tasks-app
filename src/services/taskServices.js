// services/taskService.js

import axios from "axios";

const baseURL = "http://localhost:4444/tasks";

const taskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${baseURL}/tasks`);
      return response.data;
    } catch (error) {
      console.error("Fehler beim Abrufen der Aufgaben:", error);
      throw error;
    }
  },

  createTask: async (title) => {
    try {
      const response = await axios.post(`${baseURL}/tasks`, { title });
      return response.data;
    } catch (error) {
      console.error("Fehler beim Hinzufügen der Aufgabe:", error);
      throw error;
    }
  },
};

export default taskService;
