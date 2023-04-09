const EmployerReducer = (oldUser: any, action: any) => {
  switch (action.type) {
    case "current":
      return action.payload.company;
    case "login":
      localStorage.setItem("token", "Bearer " + action.payload.token);
      // store type
      localStorage.setItem("type", "employer");
      return action.payload.company;
    case "signUp":
      localStorage.setItem("token", "Bearer " + action.payload.token);
      // store type
      localStorage.setItem("type", "employer");
      return action.payload.company;
    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      action.setType("");
      return null;
    default:
      return null;
  }
};

export default EmployerReducer;
