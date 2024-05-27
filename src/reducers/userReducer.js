const userReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "register":
      return {
        ...state,
        _id: action.payload._id,
        username: action.payload.username,
        email: action.payload.email,
        isLoggedIn: true,
      };
    case "login":
      return {
        ...state,
        [action.field]: action.value,
        isLoggedIn: true,
      };
    case "login_success":
      return {
        // ...state,
        state: action.payload,
        isLoggedIn: true,
      };
    case "logout":
      return {
        ...initialState,
      };
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
    default:
      break;
  }
  return state;
};

export default userReducer;
