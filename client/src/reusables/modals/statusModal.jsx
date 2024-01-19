// create a fixed top modal to display status messages - position fixed (top center)

import { useEffect, useState } from "react";
import { CloseStatusModalIcon } from "../svgs/svgs";

function StatusModal({ statusData, setStatusData }) {
  const [show, setShow] = useState(true);
  const [color, setColor] = useState("");

  const closeStatusModal = () => {
    setShow(false);
    setStatusData({
      status: false,
      message: "",
      type: "",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setStatusData({
        status: false,
        message: "",
        type: "",
      });
    }, 6000);

    return () => clearTimeout(timer);
  }, [statusData, setStatusData]);

  useEffect(() => {
    if (statusData.type === "success") {
      setColor("green-700");
    } else if (statusData.type === "error") {
      setColor("red-700");
    } else if (statusData.type === "warning") {
      setColor("yellow-700");
    } else if (statusData.type === "info") {
      setColor("blue-700");
    }
  }, [statusData]);

  return (
    <>
      {show && (
        <div className="animate-bounce status-modal fixed top-8 left-0 right-0 flex justify-center items-center">
          <div
            className={`status-modal-content relative w-[400px] p-2 rounded-md bg-[#D9D9D9] opacity-95 outline outline-${color}`}
          >
            <div
              className={`absolute top-0.5 right-1 text-${color}`}
              onClick={closeStatusModal}
            >
              <CloseStatusModalIcon className="w-5 h-5" />
            </div>
            <p className={`text-start text-${color}`}>{statusData.message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default StatusModal;
