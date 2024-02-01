import React, { useContext, useEffect, useState } from "react";
import { Table } from "./Table";
import { StatusModalContext } from "../../App/App";
import { useCategories } from "../../../hooks/useCategories";

const TableContainer = ({ children }) => {
  const { categories } = useCategories();
  const { statusData, setStatusData } = useContext(StatusModalContext);
  const [isSupplierModalOpen, setIsSupplierFormModalOpen] = useState(false);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table
        data={categories}
        statusData={statusData}
        setStatusData={setStatusData}
        isSupplierModalOpen={isSupplierModalOpen}
        setIsSupplierFormModalOpen={setIsSupplierFormModalOpen}
      >
        {children}
      </Table>
    </div>
  );
};

export default TableContainer;
