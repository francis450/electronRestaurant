import React, { useContext, useState } from "react";
import { Plus } from "../../../reusables/svgs/svgs";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import TableContainer from "./TableContainer";

const InventoryCategories = () => {
  const [name, setName] = useState("");
  const { postData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);

  const callback = () => {
    setName("");
  };

  const addCateggory = () => {
    const url = `/category`;
    postData(url, { name }, setStatusData, callback);
  };

  return (
    <section className="receipts-section ">
      <TableContainer>
        <div className="flex justify-between md:justify-end gap-3">
          <input
            type="text"
            placeholder="Category Name"
            className="py-0.5 px-2 focus:outline-none rounded-md text-[#222]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="btn py-1 px-3 bg-green-700 text-[white] rounded-md flex gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => addCateggory()}
            disabled={!name}
          >
            <span className="hidden md:block">Add</span> Category
            <Plus />
          </button>
        </div>
      </TableContainer>
    </section>
  );
};

export default InventoryCategories;
