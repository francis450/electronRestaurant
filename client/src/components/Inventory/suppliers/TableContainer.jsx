import React, { useContext, useState } from "react";
import { Table } from "./Table";
import { StatusModalContext } from "../../App/App";
import { useSuppliers } from "../../../hooks/useSuppliers";

export const TableContainer = ({ children }) => {
  const { suppliers } = useSuppliers()
  const { statusData, setStatusData } = useContext(StatusModalContext);
  const [isSupplierModalOpen, setIsSupplierFormModalOpen] = useState(false);

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table data={suppliers} statusData={statusData} setStatusData={setStatusData} isSupplierModalOpen={isSupplierModalOpen}
        setIsSupplierFormModalOpen={setIsSupplierFormModalOpen}>
          {children}
          </Table>
    </div>
  );
};
