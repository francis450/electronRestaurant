import React, { useEffect, useState } from "react";
import Input from "../../../reusables/forms/input";
import ItemModal from "./ItemModal";
import useAxios from "../../../hooks/useAxios";

export const Table = ({ data, statusData, setStatusData }) => {
  const [ suppliers, setSuppliers ] = useState([]);
  const { deleteData } = useAxios();
  const [ supplierData, setSuppliertData ] = useState({
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

  const deleteSupplier = (supplier) => {
    deleteData(
      `http://localhost:8000/api/supplier/${supplier.id}`,
      setStatusData
    );
  };

  useEffect(() => {
    setSuppliers(data.inventoryItems);
    setFilteredSuppliers(data.inventoryItems);
  }, [data]);

  return (
    <div className="table" id="results">
      <div className="theader">
        <div className="table_header">Item Name</div>
        <div className="table_header">Category</div>
        <div className="table_header">Supplier</div>
        <div className="table_header">Units of Measurement</div>
        <div className="table_header">Par Level</div>
        <div className="table_header">Reorder Point</div>
        <div className="table_header">Expiry Date</div>
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
          <div className="table_cell">Email</div>
          <div className="table_cell flex justify-center">-</div>
        </div>
        <div className="table_small">
          <div className="table_cell">Email</div>
          <div className="table_cell flex justify-center">-</div>
        </div>
        <div className="table_small">
          <div className="table_cell">Email</div>
          <div className="table_cell flex justify-center">-</div>
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
              <div className="table_cell">Item Name</div>
              <div className="table_cell">{supplier.item_name}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Category</div>
              <div className="table_cell">{supplier.category}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Supplier</div>
              <div className="table_cell">{supplier.supplier}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Units of Measurement</div>
              <div className="table_cell">{supplier.unit_of_measurement_id}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">PAR Level</div>
              <div className="table_cell">{supplier.par_level}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Reorder Ponts</div>
              <div className="table_cell">{supplier.reorder_point}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Expiry Date</div>
              <div className="table_cell">{supplier.expiration_date ? supplier.expiration_date : "No Expiry"}</div>
            </div>
            <div className="table_small">
              <div className="table_cell">Actions</div>
              <div className="table_cell flex gap-2 justify-center">
                <button
                  className="bg-green-700 py-0.25 px-3 rounded-md text-white"
                  onClick={() => openModal(supplier)}
                >
                  view
                </button>
                <button
                  className="bg-red-700 py-0.25 px-3 rounded-md text-white"
                  onClick={() => deleteSupplier(supplier)}
                >
                  Delete
                </button>
              </div>
            </div>
            {isSupplierModalOpen && (
              <ItemModal
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
