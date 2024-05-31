const userReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "login":
      return {
        ...state,
        _id: action.userId,
        isLoggedIn: true,
      };
    case "login_success":
      return {
        ...state,
        _id: action.payload.user._id,
        isLoggedIn: true,
      };

    // case "logout":
    //   return {
    //     ...initialState,
    //   };
    case "reset_password":
      return {
        ...state,
        user: action.payload,
      };
    case "fetch-user-data":
      const newState = action.value;
      return {
        ...newState,
        isLoggedIn: true,
      };
    case "logout":
      return {
        ...state,
        _id: "",
        username: "",
        email: "",
        isLoggedIn: false,
        userd: null,
      };
    default:
      break;
  }
  return state;
};

export default userReducer;
