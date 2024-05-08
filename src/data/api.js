const developmentMode = process.env.NODE_ENV === "development";
const productionMode = process.env.NODE_ENV === "production";

const API_URL = developmentMode ? "http://localhost:4444" : productionMode; //"http://10.0.2.2:4444"

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
