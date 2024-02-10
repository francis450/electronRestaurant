export const initialFormState = {
  name: "",
  parent_category_id: "",
  description: "",
};

export const handleCloseModalOnOutsideClick = (closeModal) => {
  window.onclick = (e) => {
    if (
      e.target.className ===
      "flex fixed top-0 right-0 bottom-0 z-10 left-0 justify-center bg-black bg-opacity-30 items-center"
    ) {
      closeModal();
    }
  };
};
