import React, { useState} from "react";
import TextField from "@material-ui/core/TextField";
import DateTimePickers from "./forms/DateTimePickers";
import FormControl from "@material-ui/core/FormControl";
import SelectForm from "./forms/SelectForm";
import Button from "@material-ui/core/Button";

const FormProject = (props) => {
    const [project, setProject] = useState({
        name: "",
        team: "",
        createdAt: "",
        endingAt: "",
        description: "",
        status: "",
      });
    

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setProject({
          ...project,
          [name]: value,
          createdAt: new Date(),
          team: props.teamID,
        });
      };

      const handleSubmit = (event)=>{
        event.preventDefault();
        props.addProject(project)
      }

    return ( 
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField label="Name" name="name" onChange={handleChange} />
          </FormControl>
          <DateTimePickers name="endingAt" onChange={handleChange} />
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              name="description"
              onChange={handleChange}
            />
          </div>

          <SelectForm name="status" selectChange={handleChange} />

          <FormControl>
            <Button variant="contained" color="primary" type="submit">
              Envoyer
            </Button>
          </FormControl>
        </form>
     );
}
 
export default FormProject;