import { DEVELOPER_IP, MOBILE_IP } from "@env";
const developmentMode = process.env.NODE_ENV === "development";
const productionMode = process.env.NODE_ENV === "production";

const API_URL = developmentMode
  ? `http://localhost:4444`
  : `http://${MOBILE_IP}:4444`;
console.log("API_URL:", API_URL);

const endpoints = {
  register: `${API_URL}/users/register`,
  login: `${API_URL}/users/login`,
  forgotPassword: `${API_URL}/users/forgot-password`,
  resetPassword: `${API_URL}/users/reset-password/:id/:token`,
  logout: `${API_URL}/users/logout`,
  profile: `${API_URL}/users/profile`,
  tasks: `${API_URL}/tasks`,
  calendar: `${API_URL}/calendar`,
  timer: `${API_URL}/timer`,
  notepad: `${API_URL}/notepad`,
};

export { endpoints, API_URL, productionMode };
