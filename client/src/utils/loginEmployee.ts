import axios from "axios";
import apiUrl from "../config/apiUrl";

interface IData {
  phone: string;
  password: string;
}

const loginEmployee = async (
  data: IData,
  setResponseMessage: any,
  dispatch: any
) => {
  try {
    const response = await axios.post(apiUrl + "/auth/user/login", data);
    setResponseMessage("");
    dispatch({ type: "login", payload: response.data });
  } catch (error: any) {
    setResponseMessage(error.response?.data?.message);
  }
};

export default loginEmployee;
