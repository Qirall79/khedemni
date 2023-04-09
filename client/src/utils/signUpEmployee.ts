import axios from "axios";
import apiUrl from "../config/apiUrl";
interface IData {
  first_name: string;
  last_name: string;
  city: string;
  sector: string;
  phone: string;
  birth_date: Date;
  password: string;
  password_confirmation: string;
  service: string;
  availability: string[];
  min_price: number;
  max_price: number;
  photo: string;
  note?: string;
}

const signUpEmployee = async (
  data: IData,
  setResponseMessage: any,
  dispatch: any
) => {
  try {
    const response = await axios.post(apiUrl + "/auth/user/signUp", data);
    setResponseMessage("");
    dispatch({ type: "signUp", payload: response.data });
  } catch (error: any) {
    setResponseMessage(error.response?.data?.message);
    console.log(error);
  }
};

export default signUpEmployee;
