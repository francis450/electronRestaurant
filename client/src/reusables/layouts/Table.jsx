import React, { useEffect, useState } from "react";
import Input from "../forms/input";
import SupplierModal from "../../components/Inventory/SupplierModal";

export const Table = ({ data }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSuppliertData] = useState({
    id: "",
    name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    address: "",
    kra_pin: "",
    customer_unit_serial_number: "",
  });
  const [isSupplierModalOpen, setIsSupplierFormModalOpen] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    contact_name: "",
    email: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
    setFilteredSuppliers(
      suppliers.filter((s) =>
        s[name].toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleChangeEditChange = (e) => {
    setSuppliertData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const closeModal = () => setIsSupplierFormModalOpen(false);
  const openModal = (supplier) => {
    setIsSupplierFormModalOpen(true);
    setSuppliertData((prev) => ({ ...prev, ...supplier }));
  };

  useEffect(() => {
    setSuppliers(data.suppliers);
    setFilteredSuppliers(data.suppliers);
  }, [data]);

  return (
    <div className="table" id="results">
      <div className="theader">
        <div className="table_header">Company Name</div>
        <div className="table_header">Contact Name</div>
        <div className="table_header">Email</div>
        <div className="table_header">Phone Number</div>
        <div className="table_header">Actions</div>
      </div>
      <div className="table_row">
        <div className="table_small">
          <div className="table_cell">Company Name</div>
          <div className="table_cell flex justify-center">
            <div className="w-8/12">
              <Input
                type="text"
                name={"name"}
                placeholder={"Search ..."}
                height={24}
                value={search.name}
                onchange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="table_small">
          <div className="table_cell">Contact Name</div>
          <div className="table_cell flex justify-center">
            <div className="w-8/12">
              <Input
                type="text"
                name={"contact_name"}
                placeholder={"Search ..."}
                height={24}
                value={search.contact_name}
                onchange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="table_small">
          <div className="table_cell">Email</div>
          <div className="table_cell flex justify-center">
            <div className="w-8/12">
              <Input
                type="text"
                name={"email"}
                placeholder={"Search ..."}
                height={24}
                value={search.email}
                onchange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="table_small">
          <div className="table_cell">Phone Number</div>
          <div className="table_cell flex justify-center">
            <div className="w-8/12">
              <Input
                type="text"
                name={"phone_number"}
                placeholder={"Search ..."}
                height={24}
                value={search.phone_number}
                onchange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="table_small">
          <div className="table_cell">Phone Number</div>
          <div className="table_cell bg-slate-300">clear search</div>
        </div>
      </div>
      {suppliers &&
        filteredSuppliers.map((supplier) => (
          <div className="table_row" key={supplier.id}>
            <div className="table_small">
              <div className="table_cell">Company Name</div>
              <div className="table_cell">{supplier.name}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Contact Name</div>
              <div className="table_cell">{supplier.contact_name}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Email</div>
              <div className="table_cell">{supplier.email}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Phone Number</div>
              <div className="table_cell">{supplier.phone_number}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Phone Number</div>
              <div className="table_cell flex gap-2 justify-center">
                <button
                  className="bg-green-700 py-0.25 px-3 rounded-md text-white"
                  onClick={() => openModal(supplier)}
                >
                  view
                </button>
                <button className="bg-red-700 py-0.25 px-3 rounded-md text-white">
                  Delete
                </button>
              </div>
            </div>
            {isSupplierModalOpen && (
              <SupplierModal
                formData={supplierData}
                handleChange={handleChangeEditChange}
                closeModal={closeModal}
                id={supplier.id}
              />
            )}
          </div>
        ))}
    </div>
  );
};
