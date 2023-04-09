import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { EmployeeContext } from "../contexts/EmployeeContext";
import User from "../components/User";
import getWorkers from "../utils/getWorkers";
import FilterForm from "../components/FilterForm";

const Home: React.FC = () => {
  const currentEmployee = useContext(EmployeeContext);
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginal] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("type") === "employer") {
      getWorkers(setUsers, setOriginal);
    }
  }, []);

  if (localStorage.getItem("type") === "employee") {
    return (
      <div>
        <Navbar />
        <div
          id="content"
          className="text-white min-h-[90.9vh] px-20 pt-16 bg-slate-800"
        >
          <h1 className="text-2xl font-medium mb-8">Votre profil</h1>
          <div className="flex flex-col gap-y-5" id="infos">
            <img
              className="rounded-full w-32"
              src={
                currentEmployee.photo ||
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="profile"
            />
            <p>{currentEmployee.service}</p>
            <p>
              {" "}
              <span className="font-semibold text-sm text-amber-200">
                Téléphone:
              </span>{" "}
              {currentEmployee.phone}
            </p>
            <p className="capitalize">
              {" "}
              <span className="font-semibold text-sm text-amber-200">
                Adresse:
              </span>{" "}
              {currentEmployee.sector + ", " + currentEmployee.city}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div
        id="content"
        className="text-white min-h-[90.9vh] px-10 pt-10 bg-slate-800"
      >
        <h1 className="text-2xl font-medium mb-20">
          Travailleurs disponibles pour vous
        </h1>

        <FilterForm
          users={users}
          setUsers={setUsers}
          originalUsers={originalUsers}
        />

        <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
          {users.map((user: any) => {
            return (
              <li key={user._id}>
                <User user={user} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
