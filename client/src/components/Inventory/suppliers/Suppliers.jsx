import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import { TableContainer } from "./TableContainer";
import SupplierModal from "./SupplierModal";
import { Plus } from "../../../reusables/svgs/svgs";
import { validateField } from "../../../lib/utils";
import { formRegexError, handleCloseModalOnOutsideClick, initialFormState } from "./constants";

const Suppliers = () => {
  const { postData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);

  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(formRegexError[name].regex, name, value, setErrors, formRegexError[name].message );
  };

  const [isSupplierModalOpen, setIsSupplierFormModalOpen] = useState(false);

  const openModal = () => setIsSupplierFormModalOpen(true);
  const closeModal = () => setIsSupplierFormModalOpen(false);

  const callback = () => {
    setFormData((prev) => ({
      ...prev,
      ...initialFormState
    }));
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/newSupplier";
    postData(url, formData, setStatusData, callback);
  };

  useEffect(() => {
    handleCloseModalOnOutsideClick(closeModal);
  }, []);

  return (  
    <>
      <section className="suppliers-table-section">
        <TableContainer errors={errors}>
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
            errors={errors}
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
