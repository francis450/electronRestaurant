import React, { useContext } from "react";
import Authenticated from "../reusables/layouts/AuthenticaedLayout";
import { AuthContext } from "../components/App/App";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const { auth } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Authenticated
      user={auth.user}
      header={<h1 className="text-2xl text-white">Inventory</h1>}
    >
      {/* use tabs to navigate the routes */}
      <div className="grid grid-cols-2 text-[#222] rounded-xl">
        <span
          className={`col-span-1 py-2 text-md  ${
            pathname.includes("menu/items")
              ? "bg-[whitesmoke]"
              : "bg-[#3a3f49]  text-[whitesmoke]"
          }`}
          onClick={() => navigate("/menu/items")}
        >
          Items
        </span>
        <span
          className={`col-span-1 py-2 text-md  ${
            pathname.includes("menu/categories")
              ? "bg-[whitesmoke]"
              : "bg-[#3a3f49]  text-[whitesmoke]"
          }`}
          onClick={() => navigate("/menu/categories")}
        >
          Categories
        </span>
      </div>
      <Outlet />
    </Authenticated>
  );
};

export default Menu;
