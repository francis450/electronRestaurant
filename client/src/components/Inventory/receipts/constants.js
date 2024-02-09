export const formRegexError = {
  receipt_number: {
    regex: /^[a-zA-Z0-9\s]{3,}$/,
    message: "Receipt number must be at least 3 characters long",
  },
  supplier_id: {
    regex: /^[1-9]{1,}$/,
    message: "Select a supplier",
  },
  date: {
    regex: /^.+$/,
    message: "Date is required",
  },
  total_cost: {
    regex: /^[1-9]{1,}$/,
    message: "Invalid total cost",
  },
};

export const initialReceiptDetailsState = {
  receipt_number: "",
  supplier_id: "",
  date: "",
  total_cost: "",
  payment_method: "",
};

export const receiptsTableCols = [
  { name: "receipt_number", header: "Receipt Number", defaultFlex: 1 },
  { name: "supplier_name", header: "Supplier", defaultFlex: 1 },
  { name: "payment_method", header: "Payment Method", defaultFlex: 1 },
  { name: "total_cost", header: "Total Cost", defaultFlex: 1 },
  { name: "date", header: "Date Created", defaultFlex: 1 },
];
