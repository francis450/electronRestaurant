import { ArrowTrendUp, Users } from "../svgs/svgs";

export default function DashCard() {
  return (
    <div className="card w-full bg-[#ACC8E5] text-[#222222] p-3 rounded-md">
      <div className="card-body flex flex-row gap-4">
        <div className="w-[50%] flex flex-col items-center">
          <div className="w-[50px] h-[50px] p-2 rounded-full bg-[#353A41] text-white flex items-center justify-center">
            <Users />
          </div>
          <h2 className="">New Clients</h2>
          <h1 className="font-bold text-xl">1000</h1>
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center">
          <div className="flex gap-3">
            <ArrowTrendUp /> + 10%
          </div>
          <p className="text-lg">This Week</p>
          <div className="card-actions  justify-end">
            <button className="btn bg-[#222222] text-[#ACC8E5] px-3 py-1 rounded-lg mt-2">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
