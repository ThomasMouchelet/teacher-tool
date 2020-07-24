import React from "react";

const TextField = ({
  name,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) => (
  <div className="form-group">
    <TextField
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder || label}
      name={name}
      id={name}
    />
  </div>
);

export default TextField;
