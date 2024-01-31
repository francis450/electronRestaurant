import React from "react";
import { DefaultModal } from "../../../reusables/modals/defaultModal";

const PurchaseItemsModal = ({ items, closeModal }) => {
  return (
    <DefaultModal
      header={`Receipt No. ${items.receipt_number} Items`}
      closeModal={closeModal}
      height={44}
    >
      <table className="w-full border-collapse border border-1 border-slate-500">
        <thead className="bg-[whitesmoke] text-[#222]">
          <tr>
            <th className="border border-gray-300 px-3 py-1.5 w-[400px]">
              Item
            </th>
            <th className="border border-gray-300 px-3 py-1.5">Quantity</th>
            <th className="border border-gray-300 px-3 py-1.5">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[#222]">
          {items.items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300">{item.inventory_name}</td>
              <td className="border border-gray-300">{item.quantity}</td>
              <td className="border border-gray-300">{item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DefaultModal>
  );
};

export default PurchaseItemsModal;
