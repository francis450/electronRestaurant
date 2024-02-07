import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import { TableContainer } from "./TableContainer";
import SupplierModal from "./SupplierModal";
import { Plus } from "../../../reusables/svgs/svgs";
import { validateField } from "../../../lib/utils";

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

  const [formRegexError, setFormRegexerror] = useState({
    name: {
      regex: /^[a-zA-Z\s]{3,}$/,
      message: "Name must be at least 3 characters long",
    },
    contact_name: {
      regex: /^[a-zA-Z\s]{3,}$/,
      message: "Name must be at least 3 characters long",
    },
    email: {
      regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email",
    },
    phone_number: {
      regex: /^0[0-9]{9}$/,
      message: "Phone number should be 10 digits long & start with 0",
    },
    address: {
      regex: /^[a-zA-Z0-9\s,]{3,}$/,
      message: "Invalid address",
    },
    kra_pin: {
      regex: /^[0-9]{11,}$/,
      message: "KRA pin should be at least 11 digits long",
    },
    customer_unit_serial_number: {
      regex: /^[0-9]{10,}$/,
      message: "Invalid serial number",
    },
  });

  const [errors, setErrors] = useState({
    name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    address: "",
    kra_pin: "",
    customer_unit_serial_number: "",
  });

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
    const url = "/newSupplier";
    postData(url, formData, setStatusData, callback);
  };

  // listen to click event outside the modal to close it
  useEffect(() => {
    window.onclick = (e) => {
      if (e.target.className === "flex fixed top-0 right-0 bottom-0 z-10 left-0 justify-center bg-black bg-opacity-30 items-center") {
        closeModal();
      }
    };
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
