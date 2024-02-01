import React, { useContext } from "react";
import { Table } from "./Table";
import { StatusModalContext } from "../../App/App";
import { useMenuItems } from "../../../hooks/useMenuItems";

const TableContainer = ({ children }) => {
  const { menuItems } = useMenuItems();
  const { statusData, setStatusData } = useContext(StatusModalContext);

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table
        data={menuItems}
        statusData={statusData}
        setStatusData={setStatusData}
      >
        {children}
      </Table>
    </div>
  );
};

export default TableContainer;
