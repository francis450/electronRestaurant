export const initialFormState = {
  name: "",
  contact_name: "",
  email: "",
  phone_number: "",
  address: "",
  kra_pin: "",
  customer_unit_serial_number: "",
};

export const formRegexError = {
  name: {
    regex: /^[a-zA-Z\s]{3,}$/,
    message: "Name must be at least 3 characters long",
  },
  contact_name: {
    regex: /^[a-zA-Z\s]{3,}$/,
    message: "Name must be at least 3 characters long",
  },
  email: {
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: "Invalid email",
  },
  phone_number: {
    regex: /^0[0-9]{9}$/,
    message: "Phone number should be 10 digits long & start with 0",
  },
  address: {
    regex: /^[a-zA-Z0-9\s,]{3,}$/,
    message: "Invalid address",
  },
  kra_pin: {
    regex: /^[0-9]{11,}$/,
    message: "KRA pin should be at least 11 digits long",
  },
  customer_unit_serial_number: {
    regex: /^[0-9]{10,}$/,
    message: "Invalid serial number",
  },
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

export const suppliersColumns = [
  { name: "index", header: "No.", defaultWidth: 80 },
  { name: "name", header: "Company Name", minWidth: 150 },
  { name: "contact_name", header: "Contact Name", minWidth: 150 },
  { name: "email", header: "Email", minWidth: 150 },
  { name: "phone_number", header: "Phone Number", minWidth: 150 },
];
