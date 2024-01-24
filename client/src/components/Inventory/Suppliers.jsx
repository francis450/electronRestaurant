import React, { useContext, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { StatusModalContext } from "../App/App";
import { SuppliersTable } from "./SuppliersTable";
import SupplierModal from "./SupplierModal";

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
      <section className="add-supplier-section">
        <div className="flex justify-end">
          <button
            className="btn py-2 px-3 bg-red-200 text-[#222] mt-2 rounded-md"
            onClick={() => openModal()}
          >
            Add Supplier
          </button>
        </div>
        {isSupplierModalOpen && (
          <SupplierModal
            formData={formData}
            closeModal={closeModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </section>
      <section className="suppliers-table-section">
        <SuppliersTable />
      </section>
    </>
  );
};

export default Suppliers;
