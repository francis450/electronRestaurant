import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { StatusModalContext } from "../../App/App";
import TableContainer from "./TableContainer";
import { Plus } from "../../../reusables/svgs/svgs";
import DiningSectionsModal from "./DiningSectionsModal";
import { handleCloseModalOnOutsideClick, initialFormState } from "./constants";

const DiningSections = () => {
  const { postData } = useAxios();
  const { setStatusData } = useContext(StatusModalContext);

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCustomSelectChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.value }));
  };

  const [isItemModalOpen, setIsItemFormModalOpen] = useState(false);

  const openModal = () => setIsItemFormModalOpen(true);
  const closeModal = () => setIsItemFormModalOpen(false);

  const callback = () => {
    setFormData((prev) => ({
      ...prev,
      ...initialFormState,
    }));

    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `/section`;
    postData(url, formData, setStatusData, callback);
  };

  useEffect(() => {
    handleCloseModalOnOutsideClick(closeModal);
  }, []);

  return (
    <>
      <section className="Items-table-section">
        <TableContainer>
          <button
            className="btn py-1 px-3 bg-red-200 text-[#222] rounded-md flex gap-1"
            onClick={() => openModal()}
          >
            <span className="whitespace-nowrap">Add Section</span>
            <Plus />
          </button>
          {isItemModalOpen && (
            <DiningSectionsModal
              formData={formData}
              closeModal={closeModal}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCustomSelectChange={handleCustomSelectChange}
            />
          )}
        </TableContainer>
      </section>
    </>
  );
};

export default DiningSections;
