import React, { useContext, useEffect, useState } from "react";
import { useInventory } from "../../../hooks/useInventory";
import { Table } from "./Table";
import { StatusModalContext } from "../../App/App";

const ItemTable = ({ children }) => {
  const { inventory } = useInventory();
  const { statusData, setStatusData } = useContext(StatusModalContext);
  const [isSupplierModalOpen, setIsSupplierFormModalOpen] = useState(false);

  useEffect(() => {
    console.log("reloading inventory items");
  }, [statusData]);

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table
        data={inventory}
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

export default ItemTable;
