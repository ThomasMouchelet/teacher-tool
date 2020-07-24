import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateTimePickers({ onChange, name }) {
  const classes = useStyles();

  return (
    <FormControl>
      <TextField
        id="datetime-local"
        label="à rendre pour"
        type="datetime-local"
        defaultValue={moment().add(1, "days")}
        className={classes.textField}
        name={name}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChange}
      />
    </FormControl>
  );
}
