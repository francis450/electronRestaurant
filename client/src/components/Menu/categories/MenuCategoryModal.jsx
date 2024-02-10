import React, { useContext, useEffect, useState } from "react";
import { DefaultModal } from "../../../reusables/modals/defaultModal";
import Input from "../../../reusables/forms/input";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import CustomSelect from "../../../reusables/forms/select";
import { useMenuCategories } from "../../../hooks/useMenuCategories";

const MenuCategoryModal = ({
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
  const { menuItemsCategories }  = useMenuCategories();
  const [mappedMenuItemsCategories, setMappedMenuItemsCategories] = useState([]);
  const { putData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);

  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `/menu_category/${formData.id}`;
    putData(
      url,
      {
        name: formData.name,
        parent_category_id: formData.parent_category_id,
        description: formData.description,
      },
      setStatusData,
      callback
    );
  };

  useEffect(() => {
    const mappedSelectCategories = menuItemsCategories?.data?.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    setMappedMenuItemsCategories(mappedSelectCategories);
  }, [menuItemsCategories]);

  return (
    <DefaultModal
      header={"Add Inventory Item Form"}
      closeModal={closeModal}
      height={34}
    >
      <form>
        <div className="form-group flex justify-center gap-2 mt-1 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="item_name" className="text-[black]">
              Category Name
            </label>
            <Input
              type={"text"}
              name={"name"}
              placeholder={"Enter item name"}
              value={formData.name ? formData.name : ""}
              onchange={handleChange}
              required={true}
            />
          </div>
        </div>

        <div className="form-group flex justify-center gap-2 mt-1 px-4">
          <div className="flex flex-col gap-1 items-start w-full">
          <label htmlFor="category" className="text-[black]">
              Menu Category
            </label>
            <CustomSelect
              name="parent_category_id"
              options={mappedMenuItemsCategories}
              handleChange={handleCustomSelectChange}
              value={formData.parent_category_id ? formData.parent_category_id : null}
              editing={editing}
            />
          </div>
        </div>
        <div className="form-group flex justify-center gap-2 mt-1 px-4">
        <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="description" className="text-[black]">
              Description
            </label>
            {/* textarea */}
            <textarea
              className="w-full focus:outline-none h-20 border bg-[#D9D9D9] text-[#222] border-gray-300 rounded-md p-2"
              name="description"
              value={formData.description ? formData.description : ""}
              onChange={handleChange}
            ></textarea>
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

export default MenuCategoryModal;
