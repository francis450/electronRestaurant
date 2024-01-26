import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import ItemModal from "./ItemModal";
import ItemTable from "./ItemsTable";

const Items = () => {
  const { postData } = useAxios();
  const { statusData, setStatusData } = useContext(StatusModalContext);

  const [formData, setFormData] = useState({
    item_id: "",
    item_name: "",
    category: "",
    unit_of_measurement_id: "",
    current_quantity: "",
    par_level: "",
    reorder_point: "",
    supplier: "",
    cost_per_unit:"",
    expiration_date: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCustomSelectChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.value}))
  }

  const [isItemModalOpen, setIsItemFormModalOpen] = useState(false);

  const openModal = () => setIsItemFormModalOpen(true);
  const closeModal = () => setIsItemFormModalOpen(false);

  const callback = () => {
    setFormData((prev) => ({
      ...prev,
      item_id: "",
      item_name: "",
      category: "",
      unit_of_measurement_id: "",
      current_quantity: "",
      par_level: "",
      reorder_point: "",
      supplier: "",
      cost_per_unit:"",
      expiration_date: "",
    }));

    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const url = `${process.env.REACT_APP_LOCAL_SERVER_URL}/newInventoryItem`;
    postData(url, formData, setStatusData, callback);
  };

  return (
    <>
      <section className="add-Item-section">
        <div className="flex justify-end">
          <button
            className="btn py-1 px-3 bg-red-200 text-[#222] mt-2 rounded-md"
            onClick={() => openModal()}
          >
            Add Item
          </button>
        </div>
        {isItemModalOpen && (
          <ItemModal
            formData={formData}
            closeModal={closeModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCustomSelectChange={handleCustomSelectChange}
          />
        )}
      </section>
      <section className="Items-table-section">
        <ItemTable statusData={statusData} />
      </section>
    </>
  );
};

export default Items;
