import ReactDataGrid from '@inovua/reactdatagrid-community';
import React from 'react'

const DataTable = ({currentPage, filteredFetchedData, setGridRef, setCurrentPage, columns, onEditComplete=()=>[]}) => {
  return (
    <ReactDataGrid
        style={{ fontSize: "1.0rem", maxHeight: "90vh" }}
        onReady={setGridRef}
        idProperty="id"
        columns={columns}
        dataSource={filteredFetchedData || []}
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
        paginationTotal={<span>Rows: {filteredFetchedData?.length}</span>}
        paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
        paginationCurrentPage={currentPage}
        onPaginationChange={({ page }) => {
          setCurrentPage(page);
        }}
        className="h-[486px] text-xl"
      />
  )
}

export default DataTable