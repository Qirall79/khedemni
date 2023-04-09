import axios from "axios";
import apiUrl from "../config/apiUrl";

const getWorkers = async (setUsers: any, setOriginal: any) => {
  try {
    // fetch users
    const response = await axios.get(apiUrl + "/users", {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    setUsers(response.data.users);
    setOriginal(response.data.users);
  } catch (error: any) {
    console.log(error);
  }
};

export default getWorkers;
