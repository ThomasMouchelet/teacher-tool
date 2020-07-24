import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SelectForm = ({ selectChange, name }) => {
  const handleChange = ({ target }) => {
    const data = {
      currentTarget: {
        name: target.name,
        value: target.value,
      },
    };
    selectChange(data);
  };

  return (
    <FormControl>
      <Select onChange={handleChange} name={name}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="OPEN">Open</MenuItem>
        <MenuItem value="CLOSE">Close</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectForm;
