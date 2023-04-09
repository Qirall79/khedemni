import React, { useContext } from "react";
import EmployeeLogin from "../components/EmployeeLogin";
import EmployerLogin from "../components/EmployerLogin";
import Navbar from "../components/Navbar";
import { TypeContext } from "../contexts/TypeContext";

const Login: React.FC = () => {
  const type = useContext(TypeContext)[0];

  return (
    <div>
      <Navbar />
      {type === "employee" ? <EmployeeLogin /> : <EmployerLogin />}
    </div>
  );
};

export default Login;
