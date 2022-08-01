export const toggleDrawer = (open) => {
  return (dispatch) => {
    dispatch({
      type: "toggle",
      payload: open,
    });
  };
};
