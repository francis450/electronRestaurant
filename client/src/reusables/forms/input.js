import React from "react";

const Input = ({ children, type, name, value, onchange, placeholder }) => {
  return (
    <div className="flex items-center gap-2 bg-[#D9D9D9] w-[350px] h-[40px] rounded-[10px]">
      <div className="px-2 border-r-2 border-[#282c34]">{children}</div>
      <input
        type={type}
        name={name}
        id={name}
        className="form-control px-1.5 focus:outline-none w-full bg-[#D9D9D9]"
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      />
    </div>
  );
};

export default Input;
