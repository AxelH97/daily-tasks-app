import React from "react";
import { createContext, useContext, useReducer } from "react";
import userReducer from "../reducers/userReducer";
const usersContext = createContext();
export const useUsersContext = () => useContext(usersContext);

const initialUser = {
  _id: "",
  username: "",
  avatarImg: {
    url: "",
    id: ""
  },
  email: "",
  isLoggedIn: false,
  userd:null
};

const UserContextProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, initialUser);
const avatarImg=user.avatarImg

  return (
    <usersContext.Provider value={{ user,avatarImg, dispatchUser }}>
      {children}
    </usersContext.Provider>
  );
};

export default UserContextProvider;
