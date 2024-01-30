import React, { useState } from "react";

const AddReceipt = () => {
  const [receiptName, setReceiptName] = useState("");
  const [purchases, setPurchases] = useState([
    { item: "", quantity: "", price: "" },
  ]);

  const handleAddRow = () => {
    setPurchases([...purchases, { item: "", quantity: "", price: "" }]);
  };

  const handleRemoveRow = (id) => {
    setPurchases(purchases.filter((purchase) => purchase.id !== id));
  };

  const handleInputChange = (index, key, value) => {
    const updatedPurchases = [...purchases];
    updatedPurchases[index][key] = value;
    setPurchases(updatedPurchases);
  };

  return (
    <div className="">
      <div className="flex my-2">
        <input
          type="text"
          placeholder="Receipt Name"
          value={receiptName}
          onChange={(e) => setReceiptName(e.target.value)}
          className="form-control py-1 px-2 focus:outline-none rounded-md text-[#222]"
        />
      </div>
      <table className="w-full border-collapse border border-1 border-slate-500">
        <thead>
          <tr>
            <th className="border border-gray-300 px-3 py-1.5">Item</th>
            <th className="border border-gray-300 px-3 py-1.5">Quantity</th>
            <th className="border border-gray-300 px-3 py-1.5">Price</th>
            <th className="border border-gray-300 px-3 py-1.5">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[#222]">
          {purchases.map((purchase, index) => (
            <tr key={index}>
              <td className="border border-gray-300">
                <input
                  type="text"
                  value={purchase.item}
                  onChange={(e) =>
                    handleInputChange(index, "item", e.target.value)
                  }
                  className="w-full px-3 py-1 focus:outline-none"
                  placeholder="Item Name"
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="text"
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
                  type="text"
                  value={purchase.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                  className="w-full px-3 py-1 focus:outline-none"
                  placeholder="Price"
                />
              </td>
              <td className="border border-gray-300">
                <button
                  onClick={() => handleRemoveRow(purchase.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button
          onClick={handleAddRow}
          className="mt-3 bg-[#61dafb] text-[#222] py-1 px-3 rounded-md"
        >
          Add Row
        </button>
      </div>
    </div>
  );
};

export default AddReceipt;
