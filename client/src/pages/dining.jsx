import React, { useContext } from "react";
import Authenticated from "../reusables/layouts/AuthenticaedLayout";
import { AuthContext } from "../components/App/App";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Dining = () => {
  const { auth } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Authenticated
      user={auth.user}
      header={<h1 className="text-2xl text-white">Dining</h1>}
    >
      <div className="grid grid-cols-2 text-[#222] rounded-xl">
        <span
          className={`col-span-1 py-2 text-md  ${
            pathname.includes("dining/tables")
              ? "bg-[whitesmoke]"
              : "bg-[#3a3f49]  text-[whitesmoke]"
          }`}
          onClick={() => navigate("/dining/tables")}
        >
          Dining Tables
        </span>
        <span
          className={`col-span-1 py-2 text-md  ${
            pathname.includes("dining/sections")
              ? "bg-[whitesmoke]"
              : "bg-[#3a3f49]  text-[whitesmoke]"
          }`}
          onClick={() => navigate("/dining/sections")}
        >
          Sections
        </span>
      </div>
      <Outlet />
    </Authenticated>
  );
};

export default Dining;
