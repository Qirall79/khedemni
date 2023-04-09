import React from "react";

interface IProps {
  user: any;
}

const User: React.FC<IProps> = ({ user }) => {
  return (
    <div className="w-[250px] h-[300px] pt-5 flex items-center flex-col rounded-lg text-black bg-slate-200 gap-3">
      <img
        className="w-20 h-20 rounded-full"
        src={
          user.photo ||
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        }
        alt="profile"
      />
      <p className="font-semibold capitalize">
        {user.firstName + " " + user.lastName}
      </p>
      <p className="capitalize">{user.service || "Autre"}</p>
      <p>{user.phone}</p>
      <p className="capitalize">
        {user.sector}, {user.city}
      </p>
      <p>
        De {user.minPrice} à {user.maxPrice} Dh
      </p>
    </div>
  );
};

export default User;
