import React from "react";

const Input = ({ children, type, name, value, onchange, placeholder, required=false, height=40 }) => {
  return (
    <div className={`flex items-center gap-2 bg-[#D9D9D9] text-[#444] w-full rounded-[10px]`} style={{height: height}}>
      {children && <div className="px-2 border-r-2 border-[#282c34]">{children}</div>}
      <input
        type={type}
        name={name}
        id={name}
        className="form-control px-1.5 focus:outline-none w-full bg-[#D9D9D9]"
        placeholder={placeholder}
        value={value}
        onChange={onchange}
        required={required}
      />
    </div>
  );
};

export default Input;
