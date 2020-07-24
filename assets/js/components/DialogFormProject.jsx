import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import DateTimePickers from "./forms/DateTimePickers";
import FormControl from "@material-ui/core/FormControl";
import SelectForm from "./forms/SelectForm";
import ProjectsAPI from "../services/projectsAPI";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(project);
      const response = await ProjectsAPI.create(project);
      console.log(response);
      handleClose();
      props.fetchProjects();
    } catch ({ response }) {
      console.log(response);
    }
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Ajouter un projet
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Ajouter
            </Button>
          </Toolbar>
        </AppBar>
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
      </Dialog>
    </div>
  );
}
