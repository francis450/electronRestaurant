import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Plus } from "../../../reusables/svgs/svgs";
import TableContainer from "./TableContainer";

const MenuItems = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <section className="receipts-section flex justify-end">
        {(pathname === "/menu/items" || pathname === "/menu") && (
          <TableContainer>
            <button
              className="btn py-1 px-3 bg-red-200 text-[#222] mt-2 rounded-md flex gap-1"
              onClick={() => navigate("/menu/items/add")}
            >
              Add Menu Item
              <Plus />
            </button>
          </TableContainer>
        )}
      </section>
      {pathname !== "/menu/items" && <Outlet />}
    </>
  );
};

export default MenuItems;
