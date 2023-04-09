import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { EmployerContext } from "../contexts/EmployerContext";

const RouteSwitch: React.FC = () => {
  const currentEmployee = useContext(EmployeeContext);
  const currentEmployer = useContext(EmployerContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            currentEmployee?._id || currentEmployer?._id ? (
              <Home />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            currentEmployee?._id || currentEmployer?._id ? (
              <Navigate to={"/"} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signUp"
          element={
            currentEmployee?._id || currentEmployer?._id ? (
              <Navigate to={"/"} />
            ) : (
              <SignUp />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
