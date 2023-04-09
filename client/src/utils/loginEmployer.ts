import axios from "axios";
import apiUrl from "../config/apiUrl";

interface IData {
  email: string;
  password: string;
}

const loginEmployer = async (
  data: IData,
  setResponseMessage: any,
  dispatch: any
) => {
  try {
    const response = await axios.post(apiUrl + "/auth/company/login", data);
    setResponseMessage("");
    dispatch({ type: "login", payload: response.data });
  } catch (error: any) {
    setResponseMessage(error.response?.data?.message);
    console.log(error);
  }
};

export default loginEmployer;
