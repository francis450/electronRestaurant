import React, { useEffect, useRef, useState } from "react";

import useAxios from "../../../hooks/useAxios";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import SupplierModal from "./SupplierModal";

export const Table = ({
  children,
  data,
  isSupplierModalOpen,
  setIsSupplierFormModalOpen,
  setStatusData,
}) => {
  const [currentPage, setCurrentPage] = useState(2);
  const [suppliers, setSuppliers] = useState([]);
  const { deleteData } = useAxios();
  const [supplierData, setSuppliertData] = useState({
    id: "",
    name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    address: "",
    kra_pin: "",
    customer_unit_serial_number: "",
  });

  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  const handleChangeEditChange = (e) => {
    setSuppliertData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const closeModal = () => setIsSupplierFormModalOpen(false);
  const openModal = (supplier) => {
    setIsSupplierFormModalOpen(true);
    setSuppliertData((prev) => ({ ...prev, ...supplier }));
  };

  const handleClickView = (item) => {
    openModal(item);
  };

  const deleteSupplier = (supplier) => {
    deleteData(
      `http://localhost:8000/api/supplier/${supplier.id}`,
      setStatusData
    );
  };

  const [searchText, setSearchText] = useState("");
  const [gridRef, setGridRef] = useState(null);
  const searchTextRef = useRef(searchText);
  searchTextRef.current = searchText;

  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current.visibleColumns;
    setSearchText(value);

    const newDataSource = suppliers.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase(); // get string value
        return acc || v.indexOf(value.toLowerCase()) !== -1; // make the search case insensitive
      }, false);
    });

    setFilteredSuppliers(newDataSource);
  };

  const renderActions = ({ data }) => {
    return (
      <div className="table_cell flex gap-2 justify-center">
        <button
          className="bg-green-700 py-0.25 px-3 rounded-md text-white"
          onClick={() => handleClickView(data)}
        >
          View
        </button>
        <button
          className="bg-red-700 py-0.25 px-3 rounded-md text-white"
          onClick={() => deleteSupplier(data)}
        >
          Delete
        </button>
      </div>
    );
  };

  useEffect(() => {
    setSuppliers(data.suppliers);
    setFilteredSuppliers(data.suppliers);
  }, [data]);

  return (
    <>
      <div className="flex justify-between items-center  mt-3 mb-1">
        <label>
          <input
            value={searchText}
            onChange={onSearchChange}
            className="py-1 border-none focus:outline-none text-[#222] rounded-md px-2"
            placeholder="search ..."
          />
        </label>
        {children}
        {isSupplierModalOpen && (
          <SupplierModal
            formData={supplierData}
            handleChange={handleChangeEditChange}
            closeModal={closeModal} 
            editing={true}
          />
        )}
      </div>
      <ReactDataGrid
        onReady={setGridRef}
        idProperty="id"
        columns={[
          { name: "name", header: "Company Name", defaultFlex: 1 },
          { name: "contact_name", header: "Contact Name", defaultFlex: 1 },
          { name: "email", header: "Email", defaultFlex: 1 },
          { name: "phone_number", header: "Phone Number", defaultFlex: 1 },
          { name: "actions", header: "Actions", render: renderActions },
        ]}
        dataSource={filteredSuppliers || []}
        pagination
        defaultLimit={10}
        paginationShowPageSizeSelector
        paginationPageSizeOptions={[5, 10, 20, 50, 100]}
        paginationToolbarProps={{
          style: {
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid rgba(0,0,0,.1)",
          },
        }}
        paginationProps={{
          style: {
            border: "none",
            borderRadius: 0,
            borderTop: "1px solid rgba(0,0,0,.1)",
          },
        }}
        paginationShowPages
        paginationMode="default"
        paginationNext={<span>Next</span>}
        paginationPrev={<span>Prev</span>}
        paginationPageInputProps={{
          style: {
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid rgba(0,0,0,.1)",
          },
        }}
        paginationShowPagesToolbar
        paginationShowSizeChanger
        paginationShowTotal
        paginationTotal={<span>Rows: {filteredSuppliers?.length}</span>}
        paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
        paginationCurrentPage={currentPage}
        onPaginationChange={({ page }) => {
          setCurrentPage(page);
        }}
        className="h-[50.10vh]"
      />
    </>
  );
};
