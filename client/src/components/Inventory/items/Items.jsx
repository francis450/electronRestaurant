import React, { useContext, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import ItemModal from "./ItemModal";
import TableContainer from "./TableContainer";
import { Plus } from "../../../reusables/svgs/svgs";

const Items = () => {
  const { postData } = useAxios();
  const { statusData, setStatusData } = useContext(StatusModalContext);

  const [formData, setFormData] = useState({
    item_id: "",
    item_name: "",
    category_id: "",
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
      category_id: "",
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
    const url = `/newInventoryItem`;
    postData(url, formData, setStatusData, callback);
  };

  return (
    <>
      <section className="Items-table-section">
        <TableContainer statusData={statusData}>
          <button
              className="btn py-1 px-3 bg-red-200 text-[#222] rounded-md flex gap-1"
              onClick={() => openModal()}
            >
            Add Item
            <Plus />
          </button>
          {isItemModalOpen && (
          <ItemModal
            formData={formData}
            closeModal={closeModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCustomSelectChange={handleCustomSelectChange}
          />
        )}
        </TableContainer>
      </section>
    </>
  );
};

export default Items;
