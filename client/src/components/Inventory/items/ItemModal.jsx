import React, { useContext, useEffect, useState } from "react";
import { DefaultModal } from "../../../reusables/modals/defaultModal";
import Input from "../../../reusables/forms/input";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import CustomSelect from "../../../reusables/forms/select";
import { useSuppliers } from "../../../hooks/useSuppliers";
import { useUnitsOfMeasure } from "../../../hooks/useUnitsOfMeasure";
import { useCategories } from "../../../hooks/useCategories";

const ItemModal = ({
  formData,
  closeModal,
  handleChange,
  handleSubmit,
  handleCustomSelectChange,
  editing = false,
}) => {
  const callback = () => {
    closeModal();
  };
  const { suppliers } = useSuppliers();
  const { unitsOfMeasure } = useUnitsOfMeasure();
  const { categories } = useCategories();
  const [mappedSuppliers, setMappedSuppliers] = useState([]);
  const [mappedCategories, setMappedCategories] = useState([]);
  const [mappedUnitsOfMeasure, setMappedUnitsOfMeasure] = useState([]);
  const { putData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);

  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `/inventoryItem/${formData.id}`;
    putData(
      url,
      {
        item_name: formData.item_name,
        category_id: formData.category_id,
        par_level: formData.par_level,
        reorder_point: formData.reorder_point,
        supplier: formData.supplier,
        unit_of_measurement_id: formData.unit_of_measurement_id,
      },
      setStatusData,
      callback
    );
  };

  useEffect(() => {
    const mappedSelectSuppliers = suppliers?.suppliers?.map((supplier) => ({
      value: supplier.id,
      label: `${supplier.name} - ${supplier.phone_number}`,
    }));
    const mappedSelectUnitsMeasure = unitsOfMeasure?.map((u) => ({
      value: u.id,
      label: u.name,
    }));
    const mappedSelectCategories = categories?.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    setMappedCategories(mappedSelectCategories);
    setMappedSuppliers(mappedSelectSuppliers);
    setMappedUnitsOfMeasure(mappedSelectUnitsMeasure);
  }, [suppliers, categories, unitsOfMeasure]);

  return (
    <DefaultModal
      header={"Add Inventory Item Form"}
      closeModal={closeModal}
      height={44}
    >
      <form>
        <div className="form-group flex justify-center gap-2 mt-1 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="item_name" className="text-[black]">
              Item Name
            </label>
            <Input
              type={"text"}
              name={"item_name"}
              placeholder={"Enter item name"}
              value={formData.item_name}
              onchange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className="form-group flex justify-center gap-2 mt-1 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="category" className="text-[black]">
              Category
            </label>
            <CustomSelect
              name="category_id"
              options={mappedCategories}
              handleChange={handleCustomSelectChange}
              value={formData.category_id ? formData.category_id : null}
              editing={editing}
            />
          </div>
          <div className="flex gap-2 items-start w-full">
            <div className="flex flex-col gap-1 items-start w-full">
              <label htmlFor="unit_of_measurement_id" className="text-[black]">
                Units of Measurement
              </label>
              <CustomSelect
                name="unit_of_measurement_id"
                options={mappedUnitsOfMeasure}
                handleChange={handleCustomSelectChange}
                value={
                  formData.unit_of_measurement_id
                    ? formData.unit_of_measurement_id
                    : null
                }
                editing={editing}
              />
            </div>
          </div>
        </div>
        <div className="form-group flex justify-center gap-2 mt-1 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Current Quantity
            </label>
            <Input
              type={"number"}
              name={"current_quantity"}
              placeholder={"Enter Quantity"}
              value={formData.current_quantity}
              onchange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              PAR Level
            </label>
            <Input
              type={"number"}
              name={"par_level"}
              placeholder={"Enter PAR Level"}
              value={formData.par_level}
              onchange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Reorder Point
            </label>
            <Input
              type={"number"}
              name={"reorder_point"}
              placeholder={"Enter reorder point"}
              value={formData.reorder_point}
              onchange={handleChange}
            />
          </div>
        </div>

        <div className="form-group flex justify-center gap-2 mt-1 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="item_id" className="text-[black]">
              Item ID
            </label>
            <Input
              type={"text"}
              name={"item_id"}
              placeholder={"Item ID"}
              value={formData.item_id}
              onchange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="expiration_date" className="text-[black]">
              Expiration Date
            </label>
            <Input
              type={"date"}
              name={"expiration_date"}
              placeholder={"MM/DD/YYYY"}
              value={formData.expiration_date}
              onchange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="cost_per_unit" className="text-[black]">
              Cost Per Unit
            </label>
            <Input
              type={"text"}
              name={"cost_per_unit"}
              placeholder={"Cost per unit"}
              value={formData.cost_per_unit}
              onchange={handleChange}
            />
          </div>
        </div>
        <div className="form-group flex justify-center gap-2 mt-1 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="username" className="text-[black]">
              Supplier
            </label>
            {
              <CustomSelect
                options={mappedSuppliers}
                name="supplier"
                handleChange={handleCustomSelectChange}
                value={formData.supplier ? formData.supplier : null}
                editing={editing}
              />
            }
          </div>
        </div>

        <div className="px-4 mt-1 flex justify-end">
          <button
            className="btn py-1 px-2 bg-green-700 text-[white] mt-1 rounded-lg"
            onClick={editing ? handleUpdate : handleSubmit}
          >
            {editing ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </DefaultModal>
  );
};

export default ItemModal;
