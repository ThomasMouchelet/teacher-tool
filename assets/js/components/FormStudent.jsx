import React, { useState} from "react";
import TextField from "@material-ui/core/TextField";
import DateTimePickers from "./forms/DateTimePickers";
import FormControl from "@material-ui/core/FormControl";
import SelectForm from "./forms/SelectForm";
import Button from "@material-ui/core/Button";

const FormStudent = (props) => {
    const [student,setStudent] = useState({
        lastName:"",
        firstName:"",
        email:"",
        password:"",
        email:"",
        team:""
    })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setStudent({
          ...student,
          [name]: value,
          team: props.teamID,
          password:"test"
        });
      };

      const handleSubmit = (event)=>{
        event.preventDefault();
        props.addStudent(student)
      }

    return ( 
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField label="Nom" name="lastName" onChange={handleChange} />
          </FormControl>
          <FormControl>
            <TextField label="Prénom" name="firstName" onChange={handleChange} />
          </FormControl>
          <FormControl>
            <TextField label="Email" name="email" onChange={handleChange} />
          </FormControl>
          <Button variant="contained" color="primary">
            réinitialiser le mot de passe
            </Button>
            <Button variant="contained" color="primary" type="submit">
            Ajouter 
            </Button>
        </form>
     );
}
 
export default FormStudent;