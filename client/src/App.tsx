import { useState, useEffect, useReducer } from "react";
import "./index.css";
import RouteSwitch from "./pages/RouteSwitch";
import EmployeeReducer from "./reducers/EmployeeReducer";
import EmployerReducer from "./reducers/EmployerReducer";
import { TypeContext } from "./contexts/TypeContext";
import {
  EmployeeContext,
  EmployeeDispatchContext,
} from "./contexts/EmployeeContext";
import {
  EmployerContext,
  EmployerDispatchContext,
} from "./contexts/EmployerContext";
import getCurrentUser from "./utils/getCurrentUser";

function App() {
  const [type, setType] = useState("");
  const [employee, employeeDispatch] = useReducer(EmployeeReducer, {});
  const [employer, employerDispatch] = useReducer(EmployerReducer, {});

  const handleClick = (e: any) => {
    const chosenType = e.target.dataset.type;
    setType(chosenType);
  };

  const getUser = async () => {
    // get user type
    const storedType = localStorage.getItem("type");
    setType(storedType || "");

    // if there's no token, there's no user
    if (!localStorage.getItem("token")) return;

    // fetch user based on his type
    if (storedType === "employee") {
      await getCurrentUser(employeeDispatch);
    } else {
      await getCurrentUser(employerDispatch);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!type) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center flex-col gap-20">
        <h1 className="text-white text-3xl font-semibold uppercase">Khdemni</h1>
        <div className="flex flex-col gap-20">
          <button
            className="bg-white w-[250px] py-2"
            onClick={handleClick}
            data-type="employer"
          >
            Je veux recruter
          </button>
          <button
            className="bg-white w-[250px] py-2"
            onClick={handleClick}
            data-type="employee"
          >
            Je veux travailler
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <TypeContext.Provider value={[type, setType]}>
        <EmployeeDispatchContext.Provider value={employeeDispatch}>
          <EmployeeContext.Provider value={employee}>
            <EmployerContext.Provider value={employer}>
              <EmployerDispatchContext.Provider value={employerDispatch}>
                <RouteSwitch />
              </EmployerDispatchContext.Provider>
            </EmployerContext.Provider>
          </EmployeeContext.Provider>
        </EmployeeDispatchContext.Provider>
      </TypeContext.Provider>
    </>
  );
}

export default App;
