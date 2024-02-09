import React, { useContext, useEffect, useState } from "react";
import { useSuppliers } from "../../../hooks/useSuppliers";
import CustomSelect from "../../../reusables/forms/select";
import { useInventory } from "../../../hooks/useInventory";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import {
  ArrowLeft,
  Plus,
  ReceiptIcon,
  Trash,
} from "../../../reusables/svgs/svgs";
import { validateField } from "../../../lib/utils";
import { formRegexError, initialReceiptDetailsState } from "./constants";

const AddReceipt = ({ setIsAddReceiptSection, editing = false }) => {
  const { suppliers } = useSuppliers();
  const { inventory } = useInventory();
  const { postData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);
  const [mappedSuppliers, setMappedSuppliers] = useState([]);
  const [mappedInventoryItems, setMappedInventoryItems] = useState([]);
  const [receiptDetails, setReceiptDetails] = useState(initialReceiptDetailsState);

  const [errors, setErrors] = useState(initialReceiptDetailsState);
  

  const [purchases, setPurchases] = useState([
    { id: 1, product_id: "", quantity: "", unit_price: "" },
  ]);

  const handleChange = (e) => {
    setReceiptDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    validateField(
      formRegexError[e.target.name].regex,
      e.target.name,
      e.target.value,
      setErrors,
      formRegexError[e.target.name].message
    );
  };

  const handleCustomSelectChange = (e, name) => {
    setReceiptDetails((prev) => ({ ...prev, [name]: e.value }));
  };

  const handleAddRow = () => {
    setPurchases([
      ...purchases,
      { id: purchases.length + 1, item: "", quantity: "", unit_price: "" },
    ]);
  };

  const handleRemoveRow = (id) => {
    setPurchases(purchases.filter((purchase) => purchase.id !== id));
  };

  const handleInputChange = (index, key, value) => {
    const updatedPurchases = [...purchases];
    updatedPurchases[index][key] = value;
    setPurchases(updatedPurchases);
  };

  const callback = () => setIsAddReceiptSection(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `/purchase`;
    postData(
      url,
      { ...receiptDetails, items: purchases },
      setStatusData,
      callback
    );
  };

  useEffect(() => {
    const mappedSelectSuppliers = suppliers?.suppliers?.map((supplier) => ({
      value: supplier.id,
      label: `${supplier.name} - ${supplier.phone_number}`,
    }));
    const mappedInventoryItems = inventory?.Items?.map((item) => ({
      value: item.id,
      label: `${item.item_name} - ${item.item_id}`,
    }));
    setMappedSuppliers(mappedSelectSuppliers);
    setMappedInventoryItems(mappedInventoryItems);
  }, [suppliers, inventory]);

  return (
    <div className="">
      <div className="grid md:grid-cols-5 gap-2 mt-2 mb-1">
        <div className="w-full">
          <input
            type="text"
            name="receipt_number"
            placeholder="Receipt Number"
            value={receiptDetails.receipt_number}
            onChange={handleChange}
            className="py-1 border-none focus:outline-none text-[#222] rounded-md px-2 w-full"
          />
          <p className="text-red-500 text-xs">{errors.receipt_number}</p>
        </div>
        <div className="w-full">
          <input
            type="number"
            name="total_cost"
            placeholder="Total"
            value={receiptDetails.total_cost}
            onChange={handleChange}
            className="form-control py-1 px-2 focus:outline-none rounded-md text-[#222] w-full"
          />
          <p className="text-red-500 text-xs">{errors.total_cost}</p>
        </div>
        <div className="w-full">
          <input
            type="date"
            name="date"
            placeholder="Date of Purchase"
            value={receiptDetails.date}
            onChange={handleChange}
            className="form-control py-1 px-2 focus:outline-none rounded-md text-[#222] w-full"
          />
          <p className="text-red-500 text-xs">{errors.date}</p>
        </div>
        <div className="w-full">
        <CustomSelect
          options={[
            { value: "cash", label: "Cash" },
            { value: "mpesa", label: "Mpesa" },
            { value: "bank", label: "Bank" },
          ]}
          name="payment_method"
          handleChange={handleCustomSelectChange}
          value={
            receiptDetails.payment_method ? receiptDetails.payment_method : null
          }
          placeholder="Select Payment Method"
          editing={editing}
          styles={{
            optionStyles: {
              background: "white",
            },
            controlStyles: {
              background: "white",
            },
          }}
        />
        {/* <p className="text-red-500 text-xs">{errors.payment_method}</p> */}
        </div>
        <div className="w-full">
        <CustomSelect
          options={mappedSuppliers}
          name="supplier_id"
          handleChange={handleCustomSelectChange}
          value={receiptDetails.supplier_id ? receiptDetails.supplier_id : null}
          placeholder="Select Supplier"
          editing={editing}
          styles={{
            optionStyles: {
              background: "white",
            },
            controlStyles: {
              background: "white",
            },
          }}
        />
        <p className="text-red-500 text-xs">{errors.supplier_id}</p>
        </div>
      </div>
      <div className="h-[480px] overflow-y-auto">
        <table className="w-full border-collapse border border-1 border-slate-500">
          <thead>
            <tr>
              <th className="border border-gray-300 px-3 py-1.5 w-[400px]">
                Item
              </th>
              <th className="border border-gray-300 px-3 py-1.5">Quantity</th>
              <th className="border border-gray-300 px-3 py-1.5">Price</th>
              <th className="border border-gray-300 px-3 py-1.5">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-[#222]">
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td className="border border-gray-300">
                  <CustomSelect
                    options={mappedInventoryItems}
                    name="product_id"
                    handleChange={(e) =>
                      handleInputChange(index, "product_id", e.value)
                    }
                    value={
                      receiptDetails.product_id
                        ? receiptDetails.product_id
                        : null
                    }
                    placeholder="Select Product Item"
                    editing={editing}
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
                    value={purchase.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    className="w-full px-3 py-1 focus:outline-none"
                    placeholder="Quantity"
                  />
                </td>
                <td className="border border-gray-300">
                  <input
                    type="number"
                    value={purchase.unit_price}
                    onChange={(e) =>
                      handleInputChange(index, "unit_price", e.target.value)
                    }
                    className="w-full px-3 py-1 focus:outline-none"
                    placeholder="Unit Price"
                  />
                </td>
                <td className="border border-gray-300">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRemoveRow(purchase.id)}
                      className="bg-red-500 text-sm text-white px-3 py-0.5 rounded-md flex items-center gap-1"
                    >
                      Remove <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsAddReceiptSection(false)}
          className="mt-3 bg-[#61dafb] text-[#222] py-1 px-3 rounded-md flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <button
          onClick={handleAddRow}
          className="mt-3 bg-orange-300 text-[#222] py-1 px-3 rounded-md flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Row
        </button>
        <button
          onClick={handleSubmit}
          className="mt-3 bg-green-700 text-[#fff] py-1 px-3 rounded-md flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={Object.values(errors).some((err) => err !== "")}
        >
          <ReceiptIcon /> Add Receipt
        </button>
      </div>
    </div>
  );
};

export default AddReceipt;
