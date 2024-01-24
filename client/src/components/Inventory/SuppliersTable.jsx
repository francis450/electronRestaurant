import React, { useContext, useEffect, useState } from "react";
import { Table } from "../../reusables/layouts/Table";
import axios from "axios";
import { StatusModalContext } from "../App/App";

export const SuppliersTable = () => {
  const { statusData } = useContext(StatusModalContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const getSuppliers = async () => {
      await axios
        .get("http://localhost:8000/api/suppliers")
        .then((res) => setData(res.data));
      console.log(data);
    };
    getSuppliers();
  }, [statusData]);

  return (
    <div className="w-full overflow-x-auto suppliers-table-div">
      <Table data={data} />
    </div>
  );
};
