import { DEVELOPER_IP, MOBILE_IP } from "@env";
const developmentMode = process.env.NODE_ENV === "development";
const productionMode = process.env.NODE_ENV === "production";

const API_URL = developmentMode
  ? `http://${DEVELOPER_IP}:4445`
  : `https://daily-tasks-backend.onrender.com`;

console.log("API_URL:", API_URL);
console.log("DEVELOPER_IP:", DEVELOPER_IP);
console.log("MOBILE_IP:", MOBILE_IP);

const endpoints = {
  register: `${API_URL}/users/register`,
  login: `${API_URL}/users/login`,
  forgotPassword: `${API_URL}/users/forgot-password`,
  resetPassword: `${API_URL}/users/reset-password/:id`,
  logout: `${API_URL}/users/logout`,
  home: `${API_URL}/users/home`,
  tasks: `${API_URL}/tasks`,
  calendar: `${API_URL}/calendar`,
  timer: `${API_URL}/timer`,
  notepad: `${API_URL}/notepad`,
  profilePage: `${API_URL}/users/:id`,
  uploadimage: `${API_URL}/users/upload-avatar/:userId`,
};

export { endpoints, API_URL, productionMode };
