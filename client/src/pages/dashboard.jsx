import { useContext } from "react";
import { AuthContext } from "../components/App/App";
import Authenticated from "../reusables/layouts/AuthenticaedLayout";
import DashCard from "../reusables/cards/DashCard";
import LineGraph from "../reusables/graphs/LineGraph";
import BarGraph from "../reusables/graphs/BarGraph";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const items = [1, 3];
  return (
    <Authenticated
      user={auth.user}
      header={<h1 className="text-2xl text-white">Dashboard</h1>}
    >
      <div className="pt-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 align-center w-full my-2">
          {items.map((item, index) => (
            <div key={`item+${item}+${index}`}>
              <DashCard />
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2">
          <div className="col-span-1">
            <LineGraph />
          </div>
          <div className="col-span-1">
            <BarGraph />
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Dashboard;
