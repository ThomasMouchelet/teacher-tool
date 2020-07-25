import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const FormTeam = (props) => {
  const [team, setTeam] = useState({
    name: "",
    createdAt: "",
    teacher: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setTeam({
      ...team,
      [name]: value,
      createdAt: new Date(),
      teacher: "/api/teachers/3",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTeam(team);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField label="Name" name="name" onChange={handleChange} />
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
