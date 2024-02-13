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
  placeholder = "Select ...",
  editing,
  styles = {
    optionStyles: {},
    controlStyles: {},
  },
}) => {
  const [selected, setSelected] = useState(value);

  const customStyles = {
    option: (defaultStyles, state) => {
      return {
        ...defaultStyles,
        textAlign: "left",
        color: state.isSelected ? "#212529" : "#222",
        backgroundColor: state.isSelected ? "#a0a0a0" : "#D9D9D9",
        ...styles.optionStyles,
      };
    },
    control: (provided, state) => ({
      ...provided,
      background: "#D9D9D9",
      borderColor: "#9e9e9e",
      minHeight: "34px",
      height: "34px",
      textAlign: "left",
      borderRadius: "0.375rem",
      border: "none",
      boxShadow: "none",
      ...styles.controlStyles,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "34px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "34px",
    }),
  };

  useEffect(() => {
    options.map((option) => {
      if (value && option.value == value) {
        setSelected(option);
      }
      return option;
    });
  }, [options, value]);

  return (
    <div className="rounded-md">
      {editing || value ? (
        <Select
          name={name}
          options={options}
          value={selected}
          styles={customStyles}
          onChange={(e) => handleChange(e, name)}
          placeholder={placeholder}
        />
      ) : (
        <Select
          name={name}
          options={options}
          styles={customStyles}
          onChange={(e) => handleChange(e, name)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default CustomSelect;
