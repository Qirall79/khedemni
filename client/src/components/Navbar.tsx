import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  EmployeeContext,
  EmployeeDispatchContext,
} from "../contexts/EmployeeContext";
import {
  EmployerContext,
  EmployerDispatchContext,
} from "../contexts/EmployerContext";

import { TypeContext } from "../contexts/TypeContext";

const Navbar: React.FC = () => {
  const currentEmployee = useContext(EmployeeContext);
  const currentEmployer = useContext(EmployerContext);
  const employeeDispatch = useContext(EmployeeDispatchContext);
  const employerDispatch = useContext(EmployerDispatchContext);
  const setType = useContext(TypeContext)[1];

  const logOut = () => {
    employeeDispatch({ type: "logout", setType: setType });
    employerDispatch({ type: "logout", setType: setType });
  };

  return (
    <div className="w-full px-10 py-7 bg-black text-white flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Khdemni</h1>
      {currentEmployee?._id || currentEmployer?._id ? (
        <div className="flex gap-20">
          <p className="capitalize font-semibold">
            {localStorage.getItem("type") === "employee"
              ? currentEmployee?.firstName + " " + currentEmployee?.lastName ||
                currentEmployer?.personFirstName +
                  " " +
                  currentEmployer?.personLastName
              : ""}
          </p>
          <button onClick={logOut}>Se déconnecter</button>
        </div>
      ) : (
        <ul className="flex gap-10">
          <li>
            <Link to={"/login"}>S'identifier</Link>
          </li>
          <li>
            <Link to={"/signUp"}>S'inscrire</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
