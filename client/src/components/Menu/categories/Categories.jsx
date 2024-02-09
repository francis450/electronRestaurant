import React, { useEffect, useState } from "react";
import CustomSelect from "../../../reusables/forms/select";
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeft, Plus, ReceiptIcon } from "../../../reusables/svgs/svgs";
import { useInventory } from "../../../hooks/useInventory";
import { formatOptions } from "../../../lib/utils";
import axios from "axios";


const Categories = () => {
  const { inventory } = useInventory();
  const [inventoryOptions, setInventoryOptions] = useState([]);
  const [ingredients, setIngredients] = useState([
    {
      id: uuidv4(),
      inventory_item_id: "",
      quantity: "",
      unit_of_measurement_id: "",
      mappedSelectedUnitsOfMeasure: [],
    },
  ]);

  const handleAddRow = () => {
    setIngredients([
      ...ingredients,
      {
        id: uuidv4(),
        inventory_item_id: "",
        quantity: "",
        unit_of_measurement_id: "",
        mappedSelectedUnitsOfMeasure: [],
      },
    ]);
  }

  const getUnitsOfMeasure = async (id) => {
    try {
      const response = await axios.get(`/unitofmeasure/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching units of measure:', error);
      return []; // Return an empty array if an error occurs
    }
  };

  const handleInventoryChange = (e, id) => {
    setIngredients((prev) => {
      return prev.map((ingredient) => {
        if (ingredient.id === id) {
          return {
            ...ingredient,
            inventory_item_id: e.value,
            unit_of_measurement_id: null,
            mappedSelectedUnitsOfMeasure: [],
          };
        }
        return ingredient;
      });
    })

    // get the units of measure for the selected inventory item by unit_of_measurement_id
    setIngredients((prev) => {
      return prev.map((ingredient) => {
        // console.log(ingredient, e.unit_of_measurement_id, id)
        if (ingredient.id === id) {
          getUnitsOfMeasure(e.unit_of_measurement_id).then((res) => {
            setIngredients((prev) => {
              return prev.map((ingredient) => {
                if (ingredient.id === id) {
                  return {
                    ...ingredient,
                    unit_of_measurement_id: e.unit_of_measurement_id,
                    mappedSelectedUnitsOfMeasure: res,
                  };
                }
                return ingredient;
              });
            })
          });
        }
        return ingredient;
      });

    })

  }

  const handleUnitOfMeasureChange = (e, id) => {
    setIngredients((prev) => {
      return prev.map((ingredient) => {
        if (ingredient.id === id) {
          return {
            ...ingredient,
            unit_of_measurement_id: e.value,
          };
        }
        return ingredient;
      });
    })
  }

  const handleSubmit = () => {
    console.log(ingredients);
  }

  useEffect(() => {
    console.log(inventory?.Items);
    // getUnitsOfMeasure(1).then((res) => console.log(res));
    setInventoryOptions(formatOptions(inventory?.Items, "id", "item_name"));
  }, [inventory]);

  return (
    <>
      <table className="w-full bg-[#333] text-left border-collapse border border-1 border-slate-500">
        <thead>
          <tr>
            <th className="border border-gray-300 px-3 py-1.5 w-[300px]">
              Category
            </th>
            <th className="border border-gray-300 px-3 py-1.5 w-[300px]">
              Ingredient
            </th>
            <th className="border border-gray-300 px-3 py-1.5 w-[300px]">
              Unit of Measure
            </th>
            <th className="border border-gray-300 px-3 py-1.5 w-[300px]">
              Price
            </th>
            <th className="border border-gray-300 px-3 py-1.5 w-[300px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-[#222]">
          {ingredients.map((ingredient) => {
            return (
                <tr key={ingredient.id}>
                  <td className="border border-gray-300">
                    <CustomSelect
                      handleChange={(e) => handleInventoryChange(e, ingredient.id, ingredient.unit_of_measurement_id)}
                      value={ingredient.inventory_item_id}
                      options={inventoryOptions || []}
                      name="inventory_item_id"
                      styles={{
                        optionStyles: {
                          background: "white",
                        },
                        controlStyles: {
                          background: "white",
                        },
                      }}
                    />
                  </td>
                  <td className="border border-gray-300">{ingredient.name}</td>
                  <td className="border border-gray-300">
                    <CustomSelect
                      handleChange={(e) => handleUnitOfMeasureChange(e, ingredient.id)}
                      value={ingredient.unit_of_measurement_id}
                      options={ingredient.mappedSelectedUnitsOfMeasure?.map(
                        (unit) => {
                          return { value: unit.id, label: unit.name };
                        }
                      )}
                      name="unit_of_measurement_id"
                      styles={{
                        optionStyles: {
                          background: "white",
                        },
                        controlStyles: {
                          background: "white",
                        },
                      }}
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input type="text" />
                  </td>
                  <td className="border border-gray-300">
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md">
                      Remove
                    </button>
                  </td>
                </tr>
            );
          })}
        </tbody>
      </table>
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
    </>
  );
};

export default Categories;
