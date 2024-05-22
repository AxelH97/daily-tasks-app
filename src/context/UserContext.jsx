import React from "react";
import { createContext, useContext, useReducer } from "react";
import userReducer from "../reducers/userReducer";
const usersContext = createContext();
export const useUsersContext = () => useContext(usersContext);

const initialUser = {
  _id: "",
  username: "",
  email: "",
  isLoggedIn: false,
  userd:null
};

const UserContextProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, initialUser);

 const userInfo=user.userd

  return (
    <usersContext.Provider value={{ user,userInfo, dispatchUser }}>
      {children}
    </usersContext.Provider>
  );
};

export default UserContextProvider;
