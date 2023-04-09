import EmployeeSignUp from "../components/EmployeeSignUp";
import { TypeContext } from "../contexts/TypeContext";
import { useContext } from "react";
import EmployerSignUp from "../components/EmployerSignUp";

const SignUp = () => {
  const type = useContext(TypeContext)[0];

  return <>{type === "employee" ? <EmployeeSignUp /> : <EmployerSignUp />}</>;
};

export default SignUp;
