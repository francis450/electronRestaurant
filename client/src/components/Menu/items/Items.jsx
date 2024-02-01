import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "../../../reusables/svgs/svgs";
import TableContainer from "./TableContainer";

const Items = () => {
  const navigate = useNavigate();
  return (
    <section className="receipts-section flex justify-end">
      <TableContainer>
        <button
          className="btn py-1 px-3 bg-red-200 text-[#222] mt-2 rounded-md flex gap-1"
          onClick={() => navigate("/menu/items/add")}
        >
          Add Menu Item
          <Plus />
        </button>
      </TableContainer>
    </section>
  );
};

export default Items;
