const EmployeeReducer = (oldUser: any, action: any) => {
  switch (action.type) {
    case "current":
      return action.payload.user;
    case "login":
      localStorage.setItem("token", "Bearer " + action.payload.token);
      // store type
      localStorage.setItem("type", "employee");
      return action.payload.user;
    case "signUp":
      localStorage.setItem("token", "Bearer " + action.payload.token);
      // store type
      localStorage.setItem("type", "employee");
      return action.payload.user;
    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      action.setType("");
      return null;
    default:
      return null;
  }
};

export default EmployeeReducer;
