const developmentMode = process.env.NODE_ENV === "development";
const productionMode = process.env.NODE_ENV === "production";

const API_URL = developmentMode ? "http://localhost:4444" : productionMode;

const endpoints = {
  register: `${API_URL}/users/register`,
  login: `${API_URL}/users/login`,
  forgotPassword: `${BASE_URL}/users/forgot-password`,
  logout: `${API_URL}/users/logout`,
  profile: `${API_URL}/users/profile`,
  todos: `${BASE_URL}/todos`,
  calendar: `${BASE_URL}/calendar`,
  timer: `${BASE_URL}/timer`,
  notepad: `${BASE_URL}/notepad`,
};

export default { endpoints, API_URL, productionMode };
