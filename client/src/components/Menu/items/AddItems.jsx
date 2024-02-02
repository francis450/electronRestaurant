import React, { useContext, useEffect, useState } from "react";
import Input from "../../../reusables/forms/input";
import CustomSelect from "../../../reusables/forms/select";
import { useInventory } from "../../../hooks/useInventory";
import {
  ArrowLeft,
  Plus,
  ReceiptIcon,
  Trash,
} from "../../../reusables/svgs/svgs";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import { useUnitsOfMeasure } from "../../../hooks/useUnitsOfMeasure";
import { useCategories } from "../../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { useMenuCategories } from "../../../hooks/useMenuCategories";

const Row = ({
  ingredients = [],
  mappedInventoryItems,
  handleInputChangee,
  handleRemoveRow,
}) => {
  return (
    <>
      {ingredients.map(
        (
          {
            inventory_item_id,
            mappedSelectedUnitsOfMeasure,
            quantity,
            unit_of_measurement_id,
            id,
          },
          index
        ) => (
          <tr key={index}>
            <td className="border border-gray-300">
              <CustomSelect
                options={mappedInventoryItems}
                name="inventory_item_id"
                handleChange={(e) => {
                  handleInputChangee(id, "inventory_item_id", e.value, index);
                }}
                value={inventory_item_id ? inventory_item_id : null}
                placeholder="Select Product Item"
                styles={{
                  optionStyles: {
                    background: "white",
                  },
                  controlStyles: {
                    background: "white",
                  },
                }}
                editing={inventory_item_id ? true : false}
              />
            </td>
            <td className="border border-gray-300">
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleInputChangee(id, "quantity", e.target.value)
                }
                className="w-full px-3 py-1 focus:outline-none"
                placeholder="Quantity"
              />
            </td>
            <td className="border border-gray-300">
              <CustomSelect
                name="unit_of_measurement_id"
                options={[...mappedSelectedUnitsOfMeasure]}
                handleChange={(e) =>
                  handleInputChangee(
                    id,
                    "unit_of_measurement_id",
                    e.value,
                    index
                  )
                }
                value={unit_of_measurement_id ? unit_of_measurement_id : null}
                styles={{
                  optionStyles: {
                    background: "white",
                  },
                  controlStyles: {
                    background: "white",
                  },
                }}
                editing={unit_of_measurement_id ? true : false}
              />
            </td>
            <td className="border border-gray-300">
              <div className="flex justify-center">
                <button
                  onClick={() => handleRemoveRow(id)}
                  type="button"
                  className="bg-red-500 text-sm text-white px-3 py-0.5 rounded-md flex items-center gap-1"
                >
                  Remove <Trash className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        )
      )}
    </>
  );
};

const AddItems = () => {
  const navigate = useNavigate();
  const { unitsOfMeasure } = useUnitsOfMeasure();
  const { inventory } = useInventory();
  const { menuCategories } = useMenuCategories();
  const { getData, postData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);
  const [mappedInventoryItems, setMappedInventoryItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mappedSelectedUnitsOfMeasure, setMappedSelectedUnitsOfMeasure] =
    useState([{}]);
  const [mappedCategories, setMappedCategories] = useState([]);
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    price: 0.0,
    menu_item_category_id: null,
    is_available: 1,
    image: null,
    note: "",
  });

  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      inventory_item_id: "",
      quantity: "",
      unit_of_measurement_id: "",
      mappedSelectedUnitsOfMeasure: [],
    },
  ]);

  const handleChange = (e) => {
    setItemData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRemoveRow = (id) => {
    setSelectedIngredient(null);
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleAddRow = () => {
    setIngredients([
      ...ingredients,
      {
        id: ingredients[ingredients.length - 1]?.id
          ? ingredients[ingredients.length - 1]?.id + 1
          : 1,
        quantity: "",
        unit_of_measurement_id: "",
        mappedSelectedUnitsOfMeasure: [],
      },
    ]);
  };

  const callback = () => navigate("/menu/items");

  const [fileName, setFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const formData = new FormData()

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    setItemData((prev) => ({ ...prev, image: file })); 
    setFileName(file.name); // Update the state with the file name
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result); // Update the state with the data URL of the image
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.keys(itemData).forEach((key) => {
      formData.append(key, itemData[key])
     })
    
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][inventory_item_id]`, ingredient.inventory_item_id);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
      formData.append(`ingredients[${index}][unit_of_measurement_id]`, ingredient.unit_of_measurement_id);
    });
    const url = `${process.env.REACT_APP_LOCAL_SERVER_URL}/menu`;
    postData(
      url,
      formData,
      setStatusData,
      callback
    );
  };

  useEffect(() => {
    const mappedInventoryItems = inventory?.Items?.map((item) => ({
      value: item.id,
      label: `${item.item_name} - ${item.item_id}`,
    }));
    const mappedSelectCategories = menuCategories?.data?.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    const mappedSelectedUnitsofMeasure = selectedCategories?.map(
      (category) => ({
        value: category.id,
        label: category.name + ` (${category.symbol})`,
      })
    );
    setMappedSelectedUnitsOfMeasure(mappedSelectedUnitsofMeasure);
    setMappedInventoryItems(mappedInventoryItems);
    setMappedCategories(mappedSelectCategories);
  }, [inventory, unitsOfMeasure, menuCategories, selectedCategories]);

  const handleGetCategories = (id) => {
    getData(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/unitofmeasure/${id}`,
      setStatusData,
      setSelectedCategories
    )
  };

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const handleInputChangee = (id, key, value, index) => {
    // clear value in select first 
    let updatedIngredients = ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, [key]: value }; // Update the specific key if the ID matches
      } else {
        return ingredient; // Return the unchanged ingredient if the ID doesn't match
      }
    });
    setIngredients(updatedIngredients);
    if (key === "inventory_item_id") {
      setSelectedIngredient(id);
      handleGetCategories(value);
    }
  };

  useEffect(() => {
    const mappedSelectedUnitsofMeasure = selectedCategories?.map(
      (category) => ({
        value: category.id,
        label: category.name + ` (${category.symbol})`,
      })
    );
    setMappedSelectedUnitsOfMeasure(mappedSelectedUnitsofMeasure);
  }, [selectedCategories]);

  useEffect(() => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.forEach((ingredient) => {
      // if selectedIngredient then update the mappedSelectedUnitsOfMeasure for that ingredient
      if (selectedIngredient) {
        const selectedItem = ingredient.id === selectedIngredient;
        if (selectedItem) {
          ingredient.mappedSelectedUnitsOfMeasure =
            mappedSelectedUnitsOfMeasure;
        }
      }
    });
    setIngredients(updatedIngredients);
  }, [mappedSelectedUnitsOfMeasure]);

  useEffect(() => {}, [ingredients]);

  return (
    <>
      <h1 className="text-xl text-left px-2">Add Items</h1>
      <form className="grid grid-cols-2 bg-white min-h-[62vh]">
        <section className="details-section px-2">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="name" className="text-[black]">
              Name
            </label>
            <Input
              type={"text"}
              name={"name"}
              placeholder={"Enter company name"}
              value={itemData.name ? itemData.name : ""}
              onchange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="description" className="text-[black]">
              Description
            </label>
            {/* textarea */}
            <textarea
              className="w-full focus:outline-none h-20 border bg-[#D9D9D9] text-[#222] border-gray-300 rounded-md p-2"
              name="description"
              value={itemData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="price" className="text-[black]">
              Price
            </label>
            <Input
              type={"number"}
              name={"price"}
              placeholder={"Enter price"}
              value={itemData.price ? itemData.price : ""}
              onchange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="cover-photo" className="text-[black]">
              Cover photo
            </label>
            <div className="flex w-full justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center flex flex-col items-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="h-10 w-10 object-cover"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3.5 6.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 1.75a3.25 3.25 0 100-6.5 3.25 3.25 0 000 6.5zm7 5.75H9V14h6v6.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <>
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-red-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-400 focus-within:ring-offset-2 hover:text-red-200"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileUpload} // Handle file upload
                      />
                    </label>
                  </>
                  {!fileName ? (
                    <p className="pl-1">or drag and drop</p>
                  ) : (
                    <p className="pl-1">{fileName}</p>
                  )}
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="description" className="text-[black]">
              Note
            </label>
            <textarea
              className="w-full focus:outline-none border bg-[#D9D9D9] text-[#222] border-gray-300 rounded-md p-2"
              name="note"
              rows={2}
              value={itemData.note}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex gap-1 items-start w-full mt-3">
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={itemData.is_available}
                onChange={(e) =>
                  setItemData((prev) => ({
                    ...prev,
                    is_available: prev.is_available === 0 ? 1 : 0,
                  }))
                }
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900">
                Available
              </span>
            </label>
          </div>
        </section>
        <section className="ingredients-section px-2">
          <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor="category" className="text-[black]">
              Menu Category
            </label>
            <CustomSelect
              name="menu_item_category_id"
              options={mappedCategories}
              handleChange={(e) => {
                setItemData((prev) => ({ ...prev, menu_item_category_id: e.value }));
              }}
              value={itemData.menu_item_category_id ? itemData.menu_item_category_id : null}
              placeholder="Select Menu Category"
            />
          </div>
          <div className="w-full flex items-start mt-3">
            <label
              htmlFor="category"
              className="w-full text-left  text-[black]"
            >
              Ingredients
            </label>
          </div>
          <div className="h-[450px] w-full overflow-y-auto">
            <table className="w-full bg-[#333] text-left border-collapse border border-1 border-slate-500">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-3 py-1.5 w-[300px]">
                    Item
                  </th>
                  <th className="border border-gray-300 px-3 py-1.5">
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-3 py-1.5 text-nowrap">
                    Unit of Measurement
                  </th>
                  <th className="border border-gray-300 px-3 py-1.5">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white text-[#222]">
                <Row
                  ingredients={[...ingredients]}
                  mappedInventoryItems={mappedInventoryItems}
                  handleInputChangee={handleInputChangee}
                  handleRemoveRow={handleRemoveRow}
                />
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="mt-3 bg-[#61dafb] text-[#222] py-1 px-3 rounded-md flex items-center gap-1"
              type="button"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
            <button
              type="button"
              onClick={handleAddRow}
              className="mt-3 bg-orange-300 text-[#222] py-1 px-3 rounded-md flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Ingredient
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-3 bg-green-700 text-[#fff] py-1 px-3 rounded-md flex items-center gap-1"
            >
              <ReceiptIcon /> Add Menu Item
            </button>
          </div>
        </section>
      </form>
    </>
  );
};

export default AddItems;