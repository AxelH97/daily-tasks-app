const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((_, index) => index !== action.payload);
    case "EDIT_TASK":
      return state.map((task, index) =>
        index === action.payload.index ? action.payload.editedTask : task
      );
    default:
      return state;
  }
};

export default taskReducer;
