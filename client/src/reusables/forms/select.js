import { useEffect, useState } from "react";
import Select from "react-select";

const defaultOptions = [
  { value: "1", label: "Blues", isSelected: true },
  { value: "2", label: "Rock" },
  { value: "3", label: "Jazz" },
  { value: "4", label: "Orchestra" },
  { value: "5", label: "Blues" },
  { value: "6", label: "Rocky" },
  { value: "7", label: "Jazzmin" },
  { value: "8", label: "Orchestration" },
  { value: "9", label: "Rocky" },
  { value: "10", label: "Jazzmin" },
  { value: "11", label: "Orchestration" },
];

const CustomSelect = ({
  name,
  value,
  options = defaultOptions,
  handleChange,
  editing,
}) => {
  const [selected, setSelected] = useState(null);

  const customStyles = {
    option: (defaultStyles, state) => {
      return {
        ...defaultStyles,
        textAlign: "left",
        color: state.isSelected ? "#212529" : "#222",
        backgroundColor: state.isSelected ? "#a0a0a0" : "#D9D9D9",
      };
    },

    control: (defaultStyles, state) => {
      return {
        ...defaultStyles,
        color: state.hasValue ? "#000" : "#212529",
        backgroundColor: "#D9D9D9",
        borderRadius: "0.375rem",
        borderColor: "#D9D9D9",
        textAlign: "left",
        border: "none",
        boxShadow: "none",
      };
    },
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#453" }),
  };

  useEffect(() => {
    options.map((option) => {
      if (value && option.value === Number(value)) {
        setSelected(option);
      }
      return option;
    });
  }, [options, value]);

  return (
    <div className="w-full rounded-md">
      {editing ? (
        <Select
          name={name}
          options={options}
          value={selected}
          styles={customStyles}
          onChange={(e) => handleChange(e, name)}
        />
      ) : (
        <Select
          name={name}
          options={options}
          styles={customStyles}
          onChange={(e) => handleChange(e, name)}
        />
      )}
    </div>
  );
};

export default CustomSelect;
