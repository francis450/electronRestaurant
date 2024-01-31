import React, { useContext } from "react";
import Authenticated from "../reusables/layouts/AuthenticaedLayout";
import { AuthContext } from "../components/App/App";

const Menu = () => {
  const { auth } = useContext(AuthContext);
  return (
    <Authenticated
      user={auth.user}
      header={<h1 className="text-2xl text-white">Inventory</h1>}
    >
      <div>Menu</div>
    </Authenticated>
  );
};

export default Menu;
