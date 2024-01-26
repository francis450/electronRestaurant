import React, { useContext, useEffect } from "react";
import { useInventory } from "../../../hooks/useInventory";
import { Table } from "./Table";
import { StatusModalContext } from "../../App/App";

const ItemTable = () => {

  const { inventory } = useInventory()
  const { statusData, setStatusData } = useContext(StatusModalContext);
  
  useEffect(() => {
    console.log("reloading....");
  }, [statusData])

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table data={inventory} statusData={statusData} setStatusData={setStatusData} />    
    </div>
  );
};

export default ItemTable;
