import React, { useContext, useState } from "react";
import { useInventory } from "../../../hooks/useInventory";
import { Table } from "./Table";
import { StatusModalContext } from "../../App/App";

const TableContainer = ({ children }) => {
  const { inventory } = useInventory();
  const { statusData, setStatusData } = useContext(StatusModalContext);
  const [isInventoryItemModalOpen, setIsInventoryItemFormModalOpen] =
    useState(false);

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table
        data={inventory}
        statusData={statusData}
        setStatusData={setStatusData}
        isInventoryItemModalOpen={isInventoryItemModalOpen}
        setIsInventoryItemFormModalOpen={setIsInventoryItemFormModalOpen}
      >
        {children}
      </Table>
    </div>
  );
};

export default TableContainer;
