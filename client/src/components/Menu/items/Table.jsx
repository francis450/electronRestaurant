import React, { useEffect, useState } from "react";

export const Table = ({ children, data, statusData, setStatusData }) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredFetchedData, setFilteredFetchedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [gridRef, setGridRef] = useState(null);

  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current.visibleColumns;
    setSearchText(value);

    const newDataSource = fetchedData.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase(); // get string value
        return acc || v.indexOf(value.toLowerCase()) !== -1; // make the search case insensitive
      }, false);
    });

    filteredFetchedData(newDataSource);
  };

  useEffect(() => {
    setFetchedData(data.data);
    setFilteredFetchedData(data.data);
    console.log(data);
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
    </>
  );
};
