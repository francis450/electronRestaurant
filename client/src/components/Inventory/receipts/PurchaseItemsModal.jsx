import React from "react";
import { DefaultModal } from "../../../reusables/modals/defaultModal";

const PurchaseItemsModal = ({ items, closeModal }) => {
  return (
    <DefaultModal
      header={`Receipt No. ${items.receipt_number} Items`}
      closeModal={closeModal}
      height={44}
    >
      <div className="">
        <table className="w-full border-collapse border border-1 border-slate-500 px-2">
          <thead className="bg-[whitesmoke] text-[#222] px-2">
            <tr>
              <th className="border border-gray-300 px-3 py-1.5 w-[400px]">
                Item
              </th>
              <th className="border border-gray-300 px-3 py-1.5 w-[200px]">
                Quantity
              </th>
              <th className="border border-gray-300 px-3 py-1.5">Price</th>
            </tr>
          </thead>
        </table>
        <div className="h-[300px] w-full overflow-y-scroll">
          <table className="w-full border-collapse border border-1 border-slate-500 px-2">
            <tbody className="text-[#222]">
              {items.items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 w-[400px]">
                    {item.inventory_name}
                  </td>
                  <td className="border border-gray-300 w-[200px]">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300">{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultModal>
  );
};

export default PurchaseItemsModal;
