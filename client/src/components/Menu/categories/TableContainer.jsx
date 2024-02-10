import React, { useContext, useEffect, useState } from "react";
import { Table } from "./Table";
import { StatusModalContext } from "../../App/App";
import { useMenuCategories } from "../../../hooks/useMenuCategories";

const TableContainer = ({ children }) => {
  const { menuCategories } = useMenuCategories();
  const { statusData, setStatusData } = useContext(StatusModalContext);
  const [isMenuItemModalOpen, setIsMenuItemFormModalOpen] = useState(false);

  useEffect(() => {
    console.log(menuCategories);
  }, [menuCategories]);

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table
        data={menuCategories}
        statusData={statusData}
        setStatusData={setStatusData}
        isMenuItemModalOpen={isMenuItemModalOpen}
        setIsMenuItemFormModalOpen={setIsMenuItemFormModalOpen}
      >
        {children}
      </Table>
    </div>
  );
};

export default TableContainer;
