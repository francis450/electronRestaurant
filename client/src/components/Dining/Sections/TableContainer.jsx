import React, { useContext, useState } from "react";
import { Table } from "./Table";
import { StatusModalContext } from "../../App/App";
import { useDiningSections } from "../../../hooks/useDiningSections";

const TableContainer = ({ children }) => {
  const { diningSections } = useDiningSections();
  const { statusData, setStatusData } = useContext(StatusModalContext);
  const [isMenuItemModalOpen, setIsMenuItemFormModalOpen] = useState(false);

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table
        data={diningSections}
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
