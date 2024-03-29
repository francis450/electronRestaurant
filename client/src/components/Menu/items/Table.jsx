import React, { useEffect, useState } from "react";
import { Trash, Visit } from "../../../reusables/svgs/svgs";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import DataTable from "../../../reusables/tables/DataTable";

export const Table = ({ children, data, setStatusData }) => {
  const navigate = useNavigate();
  const { deleteData } = useAxios();
  const [gridRef, setGridRef] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(2);
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredFetchedData, setFilteredFetchedData] = useState([]);

  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current.visibleColumns;
    setSearchText(value);

    const newDataSource = fetchedData.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase(); // get string value
        return acc || v.indexOf(value.toLowerCase()) !== -1; // make the search case insensitive
      }, false);
    });

    setFilteredFetchedData(newDataSource);
  };

  const deleteMenu = (supplier) => {
    deleteData(`/purchase/${supplier.id}`, setStatusData);
  };

  const renderActions = ({ data }) => {
    return (
      <div className="table_cell flex gap-4 justify-center">
        <button
          className="bg-yellow-500 py-0.25 px-2 rounded-md flex items-center gap-1 pr-1 text-[#222]"
          onClick={() => navigate("/menu/items/" + data.id)}
        >
          View
          <Visit className="w-5 h-5" />
        </button>
        <button
          className="bg-red-700 py-0.25 px-2 rounded-md text-white flex gap-1 items-center pr-1"
          onClick={() => deleteMenu(data)}
        >
          Delete
          <Trash className="w-4 h-4" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    setFetchedData(data.data);
    setFilteredFetchedData(data.data);
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
      </div>
      <DataTable
        setGridRef={setGridRef}
        currentPage={currentPage}
        filteredFetchedData={filteredFetchedData}
        setCurrentPage={setCurrentPage}
        columns={[
          { name: "name", header: "Name", minWidth: 150 },
          { name: "price", header: "Price", minWidth: 150 },
          {
            name: "category",
            header: "Category",
            minWidth: 150,
            render: ({ value }) => (value?.name ? value.name : "null"),
          },
          {
            name: "is_available",
            header: "Availability",
            minWidth: 50,
            render: ({ value }) => {
              return (
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={value}
                      disabled
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
              );
            },
          },
          {
            name: "created_at",
            header: "Date Created",
            minWidth: 150,
            render: ({ value }) => new Date(value).toLocaleDateString(),
          },
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
