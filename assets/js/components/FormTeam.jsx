import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

const FormTeam = (props) => {
  const [team, setTeam] = useState({});

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setTeam({
      ...team,
      [name]: value,
      teacher: "/api/teachers/3",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTeam(team);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl error={props.error ? true : false}>
        <TextField
          label="Name"
          name="name"
          onChange={handleChange}
          error={props.error ? true : false}
        />
        <FormHelperText id="component-error-text">{props.error}</FormHelperText>
      </FormControl>
      <FormControl>
        <Button variant="contained" color="primary" type="submit">
          Envoyer
        </Button>
      </FormControl>
    </form>
  );
};

export default FormTeam;
