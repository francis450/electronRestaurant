import { useContext } from "react";
import { AuthContext } from "../components/App/App";
import Authenticated from "../reusables/layouts/AuthenticaedLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { auth } = useContext(AuthContext);
  return (
    <Authenticated
      user={auth.user}
      header={<h1 className="text-2xl text-white">Inventory</h1>}
    >
      {/* tabs */}
      <div className="grid grid-cols-4 text-[#222] rounded-xl">
        <span
          className={`col-span-1 py-2 text-md  ${
            pathname.includes("inventory/items")
              ? "bg-[whitesmoke]"
              : "bg-[#3a3f49]  text-[whitesmoke]"
          }`}
          onClick={() => navigate("/inventory/items")}
        >
          Inventory Items
        </span>
        <span
          className={`col-span-1 py-2 text-md ${
            pathname.includes("inventory/suppliers")
              ? "bg-[whitesmoke]"
              : "bg-[#3a3f49] text-[whitesmoke]"
          }`}
          onClick={() => navigate("/inventory/suppliers")}
        >
          Suppliers
        </span>
        <span
          className={`col-span-1 py-2 text-md ${
            pathname.includes("inventory/receipts")
              ? "bg-[whitesmoke]"
              : "bg-[#3a3f49] text-[whitesmoke]"
          }`}
          onClick={() => navigate("/inventory/receipts")}
        >
          Receipts
        </span>
        <span
          className={`col-span-1 py-2 text-md ${
            pathname.includes("inventory/categories")
              ? "bg-[whitesmoke]"
              : "bg-[#3a3f49] text-[whitesmoke]"
          }`}
          onClick={() => navigate("/inventory/categories")}
        >
          Inventory Categories
        </span>
      </div>
      <Outlet />
    </Authenticated>
  );
};

export default Inventory;
