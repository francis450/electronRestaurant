import React, { useState } from "react";
import { Plus } from "../../../reusables/svgs/svgs";
import AddReceipt from "./AddReceipt";

const Receipts = () => {
  const [isAddReceiptSection, setIsAddReceiptSection] = useState(false);
  return (
    <>
      {!isAddReceiptSection && (
        <section className="receipts-section flex justify-end mt-3">
          <button
            className="btn py-1 px-3 bg-red-200 text-[#222] mt-2 rounded-md flex gap-1"
            onClick={() => setIsAddReceiptSection(true)}
          >
            Add Receipt
            <Plus />
          </button>
        </section>
      )}
      {isAddReceiptSection && (
        <section className="mt-4">
          <AddReceipt />
        </section>
      )}
    </>
  );
};

export default Receipts;
