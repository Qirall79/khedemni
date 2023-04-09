import axios from "axios";
import apiUrl from "../config/apiUrl";

interface IData {
  type: string;
  name?: string;
  person_first_name: string;
  person_last_name: string;
  person_status?: string;
  city: string;
  sector: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  activity: string;
  note?: string;
}

const signUpEmployer = async (
  data: IData,
  setResponseMessage: any,
  dispatch: any
) => {
  try {
    const response = await axios.post(apiUrl + "/auth/company/signUp", data);
    setResponseMessage("");
    dispatch({ type: "signUp", payload: response.data });
  } catch (error: any) {
    setResponseMessage(error.response?.data?.message);
    console.log(error);
  }
};

export default signUpEmployer;
