import { createContext, useState } from "react";
import { Login } from "../../pages/login";
import "./App.css";
import StatusModal from "../../reusables/modals/statusModal";
import Dashboard from "../../pages/dashboard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "../../reusables/routes/PrivateRoutes";
import Inventory from "../../pages/inventory";
import Menu from "../../pages/Menu";
import Items from "../Menu/items/Items";
import Categories from "../Menu/categories/Categories";
import AddItems from "../Menu/items/AddItems";
import EditItems from "../Menu/items/EditItems";

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
        element: <Inventory />
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
              }
            ]
          },
          {
            path: "categories",
            element: <Categories />,
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
      <div className="App bg-[#282c34] min-h-screen">
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
