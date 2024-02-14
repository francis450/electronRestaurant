import React, { useEffect, useState } from "react";
import CustomSelect from "../../../reusables/forms/select";
import { Trash } from "../../../reusables/svgs/svgs";
import { useInventory } from "../../../hooks/useInventory";
import { formatOptions } from "../../../lib/utils";
import axios from "axios";

const AddIngredients = ({
  ingredients,
  setIngredients,
  handleRemoveRow,
  editing = false,
}) => {
  const { inventory } = useInventory();
  const [inventoryOptions, setInventoryOptions] = useState([]);

  const getUnitsOfMeasure = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_API_SERVER_URL}/unitofmeasure/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching units of measure:", error);
      return [];
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
    });

    setIngredients((prev) => {
      return prev.map((ingredient) => {
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
            });
          });
        }
        return ingredient;
      });
    });
  };

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
    });
  };

  useEffect(() => {
    setInventoryOptions(formatOptions(inventory?.Items, "id", "item_name"));
    console.log(inventory);
  }, [inventory]);

  return (
    <div className="overflow-x-auto  h-[450px] overflow-y-auto">
      <table className="bg-[#333] text-left border-collapse border border-1 border-slate-500 overflow-y-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 w-[200px]">
              Item
            </th>
            <th className="border border-gray-300 ">Quantity</th>
            <th className="border border-gray-300">
              Unit of Measurement
            </th>
            <th className="border border-grauy-300 ">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[#222] overflow-x-scroll min overflow-y-auto">
          {ingredients.map((ingredient) => {
            return (
              <tr key={ingredient.id}>
                <td className="border border-gray-300">
                  <CustomSelect
                    handleChange={(e) =>
                      handleInventoryChange(
                        e,
                        ingredient.id,
                        ingredient.unit_of_measurement_id
                      )
                    }
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
                <td className="border border-gray-300">
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      setIngredients((prev) => {
                        return prev.map((ing) => {
                          if (ing.id === ingredient.id) {
                            return {
                              ...ing,
                              quantity: e.target.value,
                            };
                          }
                          return ing;
                        });
                      })
                    }
                    className="w-full px-3 py-1 focus:outline-none"
                    placeholder="Quantity"
                  />
                </td>
                <td className="border border-gray-300">
                  {ingredient.mappedSelectedUnitsOfMeasure?.length > 0 ? (
                    <CustomSelect
                      handleChange={(e) =>
                        handleUnitOfMeasureChange(e, ingredient.id)
                      }
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
                  ) : (
                    <p className="px-2">
                      {editing && ingredient.unit_of_measurement}
                    </p>
                  )}
                </td>
                <td className="border border-gray-300">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRemoveRow(ingredient.id)}
                      type="button"
                      className="bg-red-500 text-sm text-white px-3 py-0.5 rounded-md flex items-center gap-1"
                    >
                      Remove <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AddIngredients;
