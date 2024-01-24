import React, { useContext } from "react";
import { DefaultModal } from "../../reusables/modals/defaultModal";
import Input from "../../reusables/forms/input";
import useAxios from "../../hooks/useAxios";
import { StatusModalContext } from "../App/App";

const SupplierModal = ({
  formData,
  closeModal,
  handleChange,
  handleSubmit,
  id = null,
}) => {

  const callback = () => {
    closeModal();
  };
  const { postData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);

  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/editSupplier/${formData.id}`;
    postData(url, formData, setStatusData, callback);
  };

  return (
    <DefaultModal header={"Add Supplier Form"} closeModal={closeModal}>
      <form>
        <div className="form-group flex justify-center gap-2 mt-3 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Supplier's Company
            </label>
            <Input
              type={"text"}
              name={"name"}
              placeholder={"Enter company name"}
              value={formData.name}
              onchange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className="form-group flex justify-center gap-2 mt-3 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Contact's Name
            </label>
            <Input
              type={"text"}
              name={"contact_name"}
              placeholder={"Enter contact name"}
              value={formData.contact_name}
              onchange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Supplier's Phone
            </label>
            <Input
              type={"number"}
              name={"phone_number"}
              placeholder={"Enter name"}
              value={formData.phone_number}
              onchange={handleChange}
            />
          </div>
        </div>
        <div className="form-group flex justify-center gap-2 mt-3 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Supplier's Email
            </label>
            <Input
              type={"email"}
              name={"email"}
              placeholder={"Enter name"}
              value={formData.email}
              onchange={handleChange}
            />
          </div>
        </div>
        <div className="form-group flex justify-center gap-2 mt-3 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Supplier's KRA Pin
            </label>
            <Input
              type={"text"}
              name={"kra_pin"}
              placeholder={"Enter KRA pin"}
              value={formData.kra_pin}
              onchange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Supplier's Address
            </label>
            <Input
              type={"text"}
              name={"address"}
              placeholder={"Enter Address"}
              value={formData.address}
              onchange={handleChange}
            />
          </div>
        </div>
        <div className="form-group flex justify-center gap-2 mt-3 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Customer Unit Serial Number
            </label>
            <Input
              type={"number"}
              name={"customer_unit_serial_number"}
              placeholder={"Enter Serial Number"}
              value={formData.customer_unit_serial_number}
              onchange={handleChange}
            />
          </div>
        </div>
        <div className="px-4 mt-3 flex justify-end">
          <button
            className="btn py-2 px-4 bg-green-700 text-[white] mt-2 rounded-lg"
            onClick={id ? handleUpdate : handleSubmit}
          >
            {id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </DefaultModal>
  );
};

export default SupplierModal;
