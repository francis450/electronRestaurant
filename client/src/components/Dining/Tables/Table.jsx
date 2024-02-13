import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import "@inovua/reactdatagrid-community/index.css";
import { Pencil, Trash } from "../../../reusables/svgs/svgs";
import DiningTablesModal from "./DiningTablesModal";
import DataTable from "../../../reusables/tables/DataTable";

export const Table = ({
  children,
  data,
  isMenuItemModalOpen,
  setIsMenuItemFormModalOpen,
  setStatusData,
}) => {
  const { deleteData } = useAxios();
  const [currentPage, setCurrentPage] = useState(2);
  const [menuCategorys, setMenuCategorys] = useState([]);
  const [menuCategorysData, setMenuCategorysData] = useState({});
  const [filteredMenuCategorys, setFilteredMenuCategorys] = useState([]);

  const handleChangeEditChange = (e) => {
    setMenuCategorysData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCustomSelectChange = (e, name) => {
    setMenuCategorysData((prev) => ({ ...prev, [name]: e.value }));
  };

  const closeModal = () => setIsMenuItemFormModalOpen(false);
  const openModal = (menuCategory) => {
    setIsMenuItemFormModalOpen(true);
    setMenuCategorysData((prev) => ({ ...prev, ...menuCategory }));
  };

  const handleClickView = (item) => {
    openModal(item);
  };

  const deleteMenuCategory = (menuCategory) => {
    deleteData(
      `/tables/${menuCategory.id}`,
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

    const newDataSource = menuCategorys.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase(); // get string value
        return acc || v.indexOf(value.toLowerCase()) !== -1; // make the search case insensitive
      }, false);
    });

    setFilteredMenuCategorys(
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
          onClick={() => deleteMenuCategory(data)}
        >
          Delete
          <Trash className="w-4 h-4" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    setMenuCategorys(data.data);
    setFilteredMenuCategorys(
      data.data?.map((item, index) => ({ ...item, index: index + 1 }))
    );
  }, [data]);

  return (
    <>
      <div className="flex justify-between items-center mt-3 mb-1">
        <label style={{maxWidth: "60%"}}>
          <input
            value={searchText}
            onChange={onSearchChange}
            className="py-1 border-none focus:outline-none text-[#222] rounded-md px-2 max-w-full"
            placeholder="search ..."
          />
        </label>
        {children}
        {isMenuItemModalOpen && (
          <DiningTablesModal
            formData={menuCategorysData}
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
        filteredFetchedData={filteredMenuCategorys}
        setCurrentPage={setCurrentPage}
        columns={[
          {name: "name", header: "Name", minWidth: 200},
          {parent: "section_id", header: "Parent Category", minWidth: 200, render: ({value}) => value ? value : "No Parent" },
          {name: "description", header: "Description", minWidth: 300, render: ({value}) => value ? value.substring(0, 50) + "..." : "No Description", defaultFlex: 1 },
          {
            name: "actions",
            header: "Actions",
            minWidth: 200,
            render: renderActions,
          }
        ]}
      />
    </>
  );
};
