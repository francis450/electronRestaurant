import React, { useContext, useState } from "react";
import { Table } from "./Table";
import { StatusModalContext } from "../../App/App";
import { useReceipts } from "../../../hooks/useReceipts";

const TableContainer = ({ children }) => {
  const { receipts } = useReceipts();
  const { statusData, setStatusData } = useContext(StatusModalContext);
  const [isSupplierModalOpen, setIsSupplierFormModalOpen] = useState(false);

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table
        data={receipts}
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
