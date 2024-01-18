import { createContext, useState } from "react";
import { Login } from "../../pages/login";
import "./App.css";
import StatusModal from "../../reusables/modals/statusModal";

export const StatusModalContext = createContext();

function App() {
  const [statusData, setStatusData] = useState({
    status: false,
    message: "",
    type: "",
  });

  console.log(statusData);

  return (
    <StatusModalContext.Provider value={{ statusData, setStatusData }}>
      <div className="App bg-[#282c34] min-h-screen">
        {statusData.status && (
          <StatusModal statusData={statusData} setStatusData={setStatusData} />
        )}
        <Login />
      </div>
    </StatusModalContext.Provider>
  );
}

export default App;
