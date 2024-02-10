import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { Pencil, Trash } from "../../../reusables/svgs/svgs";
import MenuCategoryModal from "./MenuCategoryModal";

export const Table = ({
  children,
  data,
  isMenuItemModalOpen,
  setIsMenuItemFormModalOpen,
  setStatusData,
}) => {
  const { deleteData } = useAxios();
  const [currentPage, setCurrentPage] = useState(2);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [inventoryItemsData, setInventoryItemsData] = useState({});
  const [filteredInventoryItems, setFilteredInventoryItems] = useState([]);

  const handleChangeEditChange = (e) => {
    setInventoryItemsData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCustomSelectChange = (e, name) => {
    setInventoryItemsData((prev) => ({ ...prev, [name]: e.value }));
  };

  const closeModal = () => setIsMenuItemFormModalOpen(false);
  const openModal = (inventoryItem) => {
    setIsMenuItemFormModalOpen(true);
    setInventoryItemsData((prev) => ({ ...prev, ...inventoryItem }));
  };

  const handleClickView = (item) => {
    openModal(item);
  };

  const deleteInventoryItem = (inventoryItem) => {
    deleteData(
      `/inventoryItem/${inventoryItem.id}`,
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

    const newDataSource = inventoryItems.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase(); // get string value
        return acc || v.indexOf(value.toLowerCase()) !== -1; // make the search case insensitive
      }, false);
    });

    setFilteredInventoryItems(
      newDataSource.map((item, index) => ({ ...item, index: index + 1 }))
    );
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
          onClick={() => deleteInventoryItem(data)}
        >
          Delete
          <Trash className="w-4 h-4" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    setInventoryItems(data.Items);
    setFilteredInventoryItems(
      data.data?.map((item, index) => ({ ...item, index: index + 1 }))
    );
  }, [data]);



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
        {isMenuItemModalOpen && (
          <MenuCategoryModal
            formData={inventoryItemsData}
            handleChange={handleChangeEditChange}
            closeModal={closeModal}
            handleCustomSelectChange={handleCustomSelectChange}
            editing={true}
          />
        )}
      </div>
      <ReactDataGrid
        style={{ fontSize: "1.0rem" }}
        onReady={setGridRef}
        idProperty="id"
        columns={[
          {name: "name", header: "Name", minWidth: 200},
          {parent: "parent_category", header: "Parent Category", minWidth: 200, render: ({value}) => value ? value : "No Parent" },
          {name: "description", header: "Description", minWidth: 300, render: ({value}) => value ? value.substring(0, 50) + "..." : "No Description", defaultFlex: 1 },
          {
            name: "actions",
            header: "Actions",
            minWidth: 200,
            render: renderActions,
          },
        ]}
        dataSource={filteredInventoryItems || []}
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
        paginationTotal={<span>Rows: {filteredInventoryItems?.length}</span>}
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