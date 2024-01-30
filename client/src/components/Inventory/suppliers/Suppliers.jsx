import React, { useContext, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import { TableContainer } from "./TableContainer";
import SupplierModal from "./SupplierModal";
import { Plus } from "../../../reusables/svgs/svgs";

const Suppliers = () => {
  const { postData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);

  const [formData, setFormData] = useState({
    name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    address: "",
    kra_pin: "",
    customer_unit_serial_number: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isSupplierModalOpen, setIsSupplierFormModalOpen] = useState(false);

  const openModal = () => setIsSupplierFormModalOpen(true);
  const closeModal = () => setIsSupplierFormModalOpen(false);

  const callback = () => {
    setFormData((prev) => ({
      ...prev,
      name: "",
      contact_name: "",
      email: "",
      phone_number: "",
      address: "",
      kra_pin: "",
      customer_unit_serial_number: "",
    }));

    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/newSupplier";
    postData(url, formData, setStatusData, callback);
  };

  return (
    <>
      <section className="suppliers-table-section">
        <TableContainer>
        <button
            className="btn py-1 px-3 bg-red-200 text-[#222] mt-2 rounded-md flex gap-1"
            onClick={() => openModal()}
          >
            Add Supplier
            <Plus />
          </button>
          {isSupplierModalOpen && (
          <SupplierModal
            formData={formData}
            closeModal={closeModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
        </TableContainer>
      </section>
    </>
  );
};

export default Suppliers;
