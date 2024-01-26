import React, { useContext } from "react";
import { Table } from "../../../reusables/layouts/Table";
import { StatusModalContext } from "../../App/App";
import { useSuppliers } from "../../../hooks/useSuppliers";

export const SuppliersTable = () => {

  const { setStatusData } = useContext(StatusModalContext);
  const { suppliers } = useSuppliers()

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table data={suppliers} setStatusData={setStatusData} />
    </div>
  );
};
