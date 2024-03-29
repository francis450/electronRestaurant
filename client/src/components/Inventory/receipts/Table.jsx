import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import "@inovua/reactdatagrid-community/index.css";
import { Trash, Visit } from "../../../reusables/svgs/svgs";
import PurchaseItemsModal from "./PurchaseItemsModal";
import { receiptsTableCols } from "./constants";
import DataTable from "../../../reusables/tables/DataTable";

export const Table = ({
  children,
  data,
  isSupplierModalOpen,
  setIsSupplierFormModalOpen,
  setStatusData,
}) => {
  const { deleteData } = useAxios();
  const [currentPage, setCurrentPage] = useState(2);
  const [suppliers, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
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

  const deleteReceipt = (supplier) => {
    deleteData(`/purchase/${supplier.id}`, setStatusData);
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

    setFilteredReceipts(newDataSource);
  };

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
        <button
          className="bg-red-700 py-0.25 px-2 rounded-md text-white flex gap-1 items-center pr-1"
          onClick={() => deleteReceipt(data)}
        >
          Delete
          <Trash className="w-4 h-4" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    setReceipts(data.data);
    setFilteredReceipts(data.data);
  }, [data]);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-3 mb-1 gap-1 md:gap-0">
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
          <PurchaseItemsModal
            items={supplierData}
            handleChange={handleChangeEditChange}
            closeModal={closeModal}
            editing={true}
          />
        )}
      </div>
      <DataTable
        setGridRef={setGridRef}
        currentPage={currentPage}
        filteredFetchedData={filteredReceipts}
        setCurrentPage={setCurrentPage}
        columns={[
          ...receiptsTableCols,
          {
            name: "actions",
            header: "Actions",
            minWidth: 200,
            render: renderActions,
          },
        ]}
      />
    </>
  );
};
