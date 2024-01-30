import { useContext, useState } from "react";
import { AuthContext } from "../components/App/App";
import Authenticated from "../reusables/layouts/AuthenticaedLayout";
import Suppliers from "../components/Inventory/suppliers/Suppliers";
import Items from "../components/Inventory/items/Items";
import Receipts from "../components/Inventory/receipts/Receipts";

const Inventory = () => {
  const { auth } = useContext(AuthContext);
  const [tab, setTab] = useState(1);
  return (
    <Authenticated
      user={auth.user}
      header={<h1 className="text-2xl text-white">Inventory</h1>}
    >
      {/* tabs */}
      <div className="grid grid-cols-3 text-[#222] rounded-xl">
        <span
          className={`col-span-1 py-2 text-md  ${
            tab === 1 ? "bg-[whitesmoke]" : "bg-[#3a3f49]  text-[whitesmoke]"
          }`}
          onClick={() => setTab(1)}
        >
          Inventory Items
        </span>
        <span
          className={`col-span-1 py-2 text-md ${
            tab === 2 ? "bg-[whitesmoke]" : "bg-[#3a3f49] text-[whitesmoke]"
          }`}
          onClick={() => setTab(2)}
        >
          Suppliers
        </span>
        <span
          className={`col-span-1 py-2 text-md ${
            tab === 3 ? "bg-[whitesmoke]" : "bg-[#3a3f49] text-[whitesmoke]"
          }`}
          onClick={() => setTab(3)}
        >
          Receipts
        </span>
      </div>
      {tab === 1 && <Items />}
      {tab === 2 && <Suppliers />}
      {tab === 3 && <Receipts />}
    </Authenticated>
  );
};

export default Inventory;
