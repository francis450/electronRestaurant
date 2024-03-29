import React, { useEffect, useRef, useState } from "react";
import ItemModal from "./ItemModal";
import useAxios from "../../../hooks/useAxios";
import "@inovua/reactdatagrid-community/index.css";
import { Pencil, Trash } from "../../../reusables/svgs/svgs";
import { inventoryItemsCols } from "./constants";
import DataTable from "../../../reusables/tables/DataTable";

export const Table = ({
  children,
  data,
  isInventoryItemModalOpen,
  setIsInventoryItemFormModalOpen,
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

  const closeModal = () => setIsInventoryItemFormModalOpen(false);
  const openModal = (inventoryItem) => {
    setIsInventoryItemFormModalOpen(true);
    setInventoryItemsData((prev) => ({ ...prev, ...inventoryItem }));
  };

  const handleClickView = (item) => {
    openModal(item);
  };

  const deleteInventoryItem = (inventoryItem) => {
    deleteData(`/inventoryItem/${inventoryItem.id}`, setStatusData);
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
        const v = (p[col.id] + "").toLowerCase();
        return acc || v.indexOf(value.toLowerCase()) !== -1;
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
      data.Items?.map((item, index) => ({ ...item, index: index + 1 }))
    );
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
        {isInventoryItemModalOpen && (
          <ItemModal
            formData={inventoryItemsData}
            handleChange={handleChangeEditChange}
            closeModal={closeModal}
            handleCustomSelectChange={handleCustomSelectChange}
            editing={true}
          />
        )}
      </div>
      <DataTable
        setGridRef={setGridRef}
        currentPage={currentPage}
        filteredFetchedData={filteredInventoryItems}
        setCurrentPage={setCurrentPage}
        columns={[
          ...inventoryItemsCols,
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
