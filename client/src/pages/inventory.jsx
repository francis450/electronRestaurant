import { useContext, useState } from "react";
import { AuthContext } from "../components/App/App";
import Authenticated from "../reusables/layouts/AuthenticaedLayout";
import Suppliers from "../components/Inventory/Suppliers";

const Inventory = () => {
  const { auth } = useContext(AuthContext);
  const [tab, setTab] = useState(1);
  return (
    <Authenticated
      user={auth.user}
      header={<h1 className="text-2xl text-white">Inventory</h1>}
    >
      {/* tabs */}
      <div className="grid grid-cols-2 text-[#222] rounded-xl">
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
      </div>
      {tab === 1 && <></>}
      {tab === 2 && <Suppliers />}
    </Authenticated>
  );
};

export default Inventory;
