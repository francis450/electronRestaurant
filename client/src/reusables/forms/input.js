import React from "react";

const Input = ({
  children,
  type,
  name,
  value,
  onchange,
  placeholder,
  required = false,
  height,
}) => {
  return (
    <div
      className={`flex items-center gap-2 bg-[#D9D9D9] text-[#444] w-full rounded-md`}
      style={{ height: height }}
    >
      {children && (
        <div className="px-2 border-r-2 border-[#282c34]">{children}</div>
      )}
      <input
        type={type}
        name={name}
        id={name}
        className="form-control py-1 px-2 focus:outline-none w-full bg-[#D9D9D9] rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={onchange}
        required={required}
      />
    </div>
  );
};

export default Input;
