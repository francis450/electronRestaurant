export const initialFormState = {
  item_id: "",
  item_name: "",
  category_id: "",
  unit_of_measurement_id: "",
  current_quantity: "",
  par_level: "",
  reorder_point: "",
  supplier: "",
  cost_per_unit: "",
  expiration_date: "",
};

export const formRegexError = {
  item_name: {
    regex: /^[a-zA-Z\s]{3,}$/,
    message: "Name must be at least 3 characters long",
  },
  category_id: {
    regex: /.*\d+.*$/,
    message: "Name must be at least 3 characters long",
  },
  unit_of_measurement_id: {
    regex: /.*\d+.*$/,
    message: "Name must be at least 3 characters long",
  },
  current_quantity: {
    regex: /^[0-9]{1,}$/,
    message: "Invalid quantity",
  },
  par_level: {
    regex: /^[0-9]{1,}$/,
    message: "Invalid quantity",
  },
  reorder_point: {
    regex: /^[0-9]{1,}$/,
    message: "Invalid reorder point",
  },
  supplier: {
    regex: /^[a-zA-Z\s]{3,}$/,
    message: "Name must be at least 3 characters long",
  },
  cost_per_unit: {
    regex: /^[0-9]{1,}$/,
    message: "Invalid quantity",
  },
  expiration_date: {
    regex: /^[0-9]{1,}$/,
    message: "Invalid quantity",
  },
};

export const inventoryItemsCols = [
  { name: "id", header: "ID", defaultVisible: false },
  {
    name: "item_name",
    header: "Item Name",
    defaultFlex: 1,
    minWidth: 150,
  },
  {
    name: "category_name",
    header: "Category",
    defaultFlex: 1,
    minWidth: 150,
  },
  {
    name: "supplier_name",
    header: "Supplier",
    defaultFlex: 1,
    minWidth: 300,
  },
  { name: "unit_of_measurement_name", header: "Units of Measurement" },
  { name: "par_level", header: "Par Level" },
  { name: "reorder_point", header: "Reorder Point" },
  { name: "expiration_date", header: "Expiry Date" },
];
