//  services/taskService.js
//  import axios from "axios"; import API_URL from "../data/api";

// import axios from "axios";
// import { API_URL } from "../data/api";
//console.log("API_URL!:", API_URL);
// const taskService = {
//   getAllTasks: async () => {
//     try {
//       const response = await axios.get(`${API_URL}/tasks`);
//       return response.data;
//     } catch (error) {
//       console.error("Error retrieving tasks:", error);
//       throw error;
//     }
//    },

//   createTask: async (title) => {
//     try {
//       const response = await axios.post(`${API_URL}/tasks`, { title });
//       return response.data;
//     } catch (error) {
//       console.error("Error retrieving tasks:", error);
//       throw error;
//     }
//   },

//   deleteTask: async (id) => {
//     try {
//       const response = await axios.delete(`${`${API_URL}/tasks`}/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting tasks:", error);
//       throw error;
//     }
//   },

//   updateTask: async (id, updatedTitle) => {
//     try {
//       const response = await axios.put(`${`${API_URL}/tasks`}/${id}`, {
//         title: updatedTitle,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error updating tasks:", error);
//       throw error;
//     }
//   },
// };

//  export default taskService;
