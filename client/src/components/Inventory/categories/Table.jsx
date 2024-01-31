import React, { useCallback, useEffect, useRef, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { Visit } from "../../../reusables/svgs/svgs";
// import PurchaseItemsModal from "./PurchaseItemsModal";

export const Table = ({
  children,
  data,
  isSupplierModalOpen,
  setIsSupplierFormModalOpen,
  setStatusData,
}) => {
  const { putData, deleteData } = useAxios();
  const [currentPage, setCurrentPage] = useState(2);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState({});

  const handleChangeEditChange = (e) => {
    setSupplierData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const closeModal = () => setIsSupplierFormModalOpen(false);
  const openModal = (supplier) => {
    setIsSupplierFormModalOpen(true);
    setSupplierData((prev) => ({
      ...prev,
      items: supplier.items,
      receipt_number: supplier.receipt_number,
    }));
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

  const onEditComplete = useCallback(
    ({ value, columnId, rowId }) => {
      const url = `${process.env.REACT_APP_LOCAL_SERVER_URL}/category/${rowId}`;
      putData(url, { [columnId]: value }, setStatusData, () =>
        console.log("updated")
      );
    },
    [data]
  );

  const renderActions = ({ data }) => {
    return (
      <div className="table_cell flex gap-4 justify-center">
        <button
          className="bg-yellow-500 py-0.25 px-2 rounded-md flex items-center gap-1 pr-1 text-[#222]"
          onClick={() => handleClickView(data)}
        >
          View
          <Visit className="w-5 h-5" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    setSuppliers(data);
    setFilteredSuppliers(data);
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
      </div>
      <ReactDataGrid
        style={{ fontSize: "1.0rem" }}
        onReady={setGridRef}
        idProperty="id"
        columns={[{ name: "name", header: "Name", defaultFlex: 1 }]}
        dataSource={filteredSuppliers || []}
        editable={true}
        pagination
        defaultLimit={10}
        onEditComplete={onEditComplete}
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
        className="h-[50.15vh] text-xl"
      />
    </>
  );
};
