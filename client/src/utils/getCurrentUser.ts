import axios from "axios";
import apiUrl from "../config/apiUrl";

const getCurrentUser = async (dispatch: any) => {
  try {
    // fetch user
    const response = await axios.get(apiUrl + "/auth/current", {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    // change user state
    dispatch({
      type: "current",
      payload: response.data,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export default getCurrentUser;
