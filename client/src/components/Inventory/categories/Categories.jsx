import React, { useContext, useState } from "react";
import { Plus } from "../../../reusables/svgs/svgs";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import TableContainer from "./TableContainer";

const Categories = () => {
  const [name, setName] = useState("");
  const { postData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);

  const callback = () => {
    setName("");
  };

  const addCateggory = () => {
    const url = `${process.env.REACT_APP_LOCAL_SERVER_URL}/category`;
    postData(url, { name }, setStatusData, callback);
  };

  return (
    <section className="receipts-section ">
      <TableContainer>
        <div className="mt-2 flex justify-end gap-3">
          <input
            type="text"
            placeholder="Category Name"
            className="py-0.5 px-2 focus:outline-none rounded-md text-[#222]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="btn py-1 px-3 bg-red-200 text-[#222] rounded-md flex gap-1"
            onClick={() => addCateggory()}
          >
            Add Category
            <Plus />
          </button>
        </div>
      </TableContainer>
    </section>
  );
};

export default Categories;
