import React from "react";
import { CloseStatusModalIcon } from "../svgs/svgs";

export const DefaultModal = ({ children, header, closeModal, height=55 }) => {
  return (
    <div className="flex fixed top-0 right-0 bottom-0 left-0 justify-center bg-black bg-opacity-30 items-center">
      <div className={`modal rounded-md w-2/5 h-[${height}vh] bg-white`} style={{height: `${height}vh`}}>
        <div className="modal-header h-13 bg-slate-700 flex items-center justify-between p-3">
          <h3 className="font-medium text-lg text-white">{header}</h3>
          <div className="close-modal" onClick={() => closeModal()}>
            <CloseStatusModalIcon className="h-8 w-8" />
          </div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
