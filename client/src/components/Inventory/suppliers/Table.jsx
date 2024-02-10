import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import SupplierModal from "./SupplierModal";
import { Pencil, Trash } from "../../../reusables/svgs/svgs";
import { validateField } from "../../../lib/utils";
import { formRegexError, handleCloseModalOnOutsideClick, initialFormState, suppliersColumns } from "./constants";

export const Table = ({
  children,
  data,
  isSupplierModalOpen,
  setIsSupplierFormModalOpen,
  setStatusData,
}) => {
  const { deleteData } = useAxios();
  const [currentPage, setCurrentPage] = useState(2);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState(initialFormState);

  const [errors, setErrors] = useState(initialFormState);

  const handleChangeEditChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prev) => ({ ...prev, [name]: value }));
    validateField(formRegexError[name].regex, name, value, setErrors, formRegexError[name].message );
  };

  const closeModal = () => setIsSupplierFormModalOpen(false);
  const closeModalRef = useRef(closeModal);
  const openModal = (supplier) => {
    setIsSupplierFormModalOpen(true);
    setSupplierData((prev) => ({ ...prev, ...supplier }));
  };

  const handleClickView = (supplier) => {
    openModal(supplier);
  };

  const deleteSupplier = (supplier) => {
    deleteData(
      `/supplier/${supplier.id}`,
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
      <div className="table_cell flex gap-4 justify-center">
        <button
          className="bg-yellow-500 py-0.25 px-2 rounded-md flex items-center gap-1 pr-1 text-[#222]"
          onClick={() => handleClickView(data)}
        >
          Edit
          <Pencil className="w-4 h-4" />
        </button>
        <button
          className="bg-red-700 py-0.25 px-2 rounded-md text-white flex gap-1 items-center pr-1"
          onClick={() => deleteSupplier(data)}
        >
          Delete
          <Trash className="w-4 h-4" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    setSuppliers(data.suppliers);
    setFilteredSuppliers(
      data.suppliers.map((supplier, index) => ({
        ...supplier,
        index: index + 1,
      }))
    );
  }, [data]);
  
  useEffect(() => {
    handleCloseModalOnOutsideClick(closeModalRef.current);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mt-3 mb-1">
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
            errors={errors}
            editing={true}
          />
        )}
      </div>
      <ReactDataGrid
        style={{ fontSize: "1.0rem" }}
        onReady={setGridRef}
        idProperty="id"
        columns={[
          ...suppliersColumns,
          {
            name: "actions",
            header: "Actions",
            minWidth: 200,
            render: renderActions,
          },
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
        className="h-[50.15vh] text-xl"
      />
    </>
  );
};
