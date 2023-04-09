import { useForm } from "react-hook-form";
import loginEmployee from "../utils/loginEmployee";
import { useContext, useState } from "react";
import { EmployeeDispatchContext } from "../contexts/EmployeeContext";

interface IData {
  phone: string;
  password: string;
}

const EmployeeLogin = () => {
  // Response error message
  const [responseMessage, setResponseMessage] = useState("");
  const employeeDispatch = useContext(EmployeeDispatchContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>();

  const handleForm = async (data: IData) => {
    await loginEmployee(data, setResponseMessage, employeeDispatch);
  };

  return (
    <div
      id="content"
      className="min-h-[90.9vh] px-20 pt-20 bg-slate-800 text-white"
    >
      <h1 className="mb-10 text-2xl font-medium">S'identifier</h1>
      <form
        method="post"
        className="pb-10 flex flex-col items-start gap-y-6 w-full max-w-[600px]"
      >
        <div className="form-group w-full flex flex-col gap-y-2">
          <label htmlFor="phone">Téléphone</label>
          <input
            {...register("phone", {
              required: "Veuillez entrez votre numéro de téléphone",
              minLength: {
                value: 10,
                message: "Votre numéro de téléphone est invalide",
              },
            })}
            className="w-full h-8 rounded-sm text-black outline-none pl-2"
            type="tel"
            name="phone"
            id="phone"
          />
          <p className="text-sm font-medium text-red-500">
            {errors?.phone?.message}
          </p>
        </div>

        <div className="form-group w-full flex flex-col gap-y-2">
          <label htmlFor="password">Mot de passe</label>
          <input
            {...register("password", {
              required: "Veuillez entrez votre mot de passe",
              minLength: {
                value: 8,
                message: "Votre mot de passe est invalide",
              },
            })}
            className="w-full h-8 rounded-sm text-black outline-none pl-2"
            type="password"
            name="password"
            id="password"
          />
          <p className="text-sm font-medium text-red-500">
            {errors?.password?.message}
          </p>
        </div>
        <p className="text-sm font-medium text-red-500">{responseMessage}</p>
        <button
          onClick={handleSubmit(handleForm)}
          type="submit"
          className="px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-white hover:text-black transition-all duration-200"
        >
          S'identifier
        </button>
      </form>
    </div>
  );
};

export default EmployeeLogin;
