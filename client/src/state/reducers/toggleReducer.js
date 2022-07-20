const toggleReducer = (state = true, action) => {
  if (action.type === "toggle") {
    return !action.payload;
  } else {
    return state;
  }
};

export default toggleReducer;