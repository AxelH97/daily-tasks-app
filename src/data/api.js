const developmentMode = process.env.NODE_ENV === "development";
const productionMode = process.env.NODE_ENV === "production";

const API_URL = developmentMode ? "http://localhost:4444" : productionMode;

const endpoints = {
  register: `${API_URL}/users/register`,
  login: `${API_URL}/users/login`,
  forgotPassword: `${API_URL}/users/forgot-password`,
  logout: `${API_URL}/users/logout`,
  profile: `${API_URL}/users/profile`,
  todos: `${API_URL}/todos`,
  calendar: `${API_URL}/calendar`,
  timer: `${API_URL}/timer`,
  notepad: `${API_URL}/notepad`,
};

export { endpoints, API_URL, productionMode };
