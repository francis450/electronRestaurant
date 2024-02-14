import { createContext, useState } from "react";
import { Login } from "../../pages/login";
import "./App.css";
import StatusModal from "../../reusables/modals/statusModal";
import Dashboard from "../../pages/dashboard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "../../reusables/routes/PrivateRoutes";
import Inventory from "../../pages/inventory";
import Menu from "../../pages/Menu";
import Items from "../Menu/items/MenuItems";
import AddItems from "../Menu/items/AddMenuItems";
import EditItems from "../Menu/items/EditMenuItems";
import InventoryItems from "../Inventory/items/InventoryItems";
import Suppliers from "../Inventory/suppliers/Suppliers";
import Receipts from "../Inventory/receipts/Receipts";
import InventoryCategories from "../Inventory/categories/InventoryCategories";
import MenuCategories from "../Menu/categories/MenuCategories";
import DiningSections from "../Dining/Sections/DiningSections";
import DiningTables from "../Dining/Tables/DiningTables";
import Dining from "../../pages/dining";

export const StatusModalContext = createContext();
export const AuthContext = createContext();

let router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "inventory",
        element: <Inventory />,
        children: [
          {
            path: "items",
            element: <InventoryItems />,
          },
          {
            path: "suppliers",
            element: <Suppliers />,
          },
          {
            path: "receipts",
            element: <Receipts />,
          },
          {
            path: "categories",
            element: <InventoryCategories />,
          },
        ],
      },
      {
        path: "menu",
        element: <Menu />,
        children: [
          {
            path: "items",
            element: <Items />,
            children: [
              {
                path: "add",
                element: <AddItems />,
              },
              {
                path: ":id",
                element: <EditItems />,
              },
              {
                path: ":id/:action",
                element: <Items />,
              },
            ],
          },
          {
            path: "categories",
            element: <MenuCategories />,
          },
        ],
      },
      {
        path: "dining",
        element: <Dining/>,
        children: [
          {
            path: "tables",
            element: <DiningTables />,
          },
          {
            path: "sections",
            element: <DiningSections />,
          }
        ]
      }
    ],
  },
]);

function App() {
  const [statusData, setStatusData] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [auth, setAuth] = useState({
    id: null,
    user: "",
    token: "",
  });

  return (
    <StatusModalContext.Provider value={{ statusData, setStatusData }}>
      <div className="App bg-[whitesmoke]">
        {statusData.status && (
          <StatusModal statusData={statusData} setStatusData={setStatusData} />
        )}
        <AuthContext.Provider value={{ auth, setAuth }}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </div>
    </StatusModalContext.Provider>
  );
}

export default App;
