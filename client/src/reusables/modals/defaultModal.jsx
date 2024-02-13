import React from "react";
import { CloseStatusModalIcon } from "../svgs/svgs";

export const DefaultModal = ({ children, header, closeModal, height = 55 }) => {
  return (
    <div className="flex fixed top-0 right-0 bottom-0 z-10 left-0 justify-center bg-black bg-opacity-30 items-center">
      <div
        className={`modal rounded-md w-11/12 md:w-2/5 min-h-[${height}vh] bg-white`}
        style={{ minHeight: `${height}vh` }}
      >
        <div className="modal-header h-10 bg-slate-700 flex items-center justify-between p-3">
          <h3 className="font-medium text-lg text-white">{header}</h3>
          <div className="close-modal" onClick={() => closeModal()}>
            <CloseStatusModalIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="modal-content relativex`">{children}</div>
      </div>
    </div>
  );
};
