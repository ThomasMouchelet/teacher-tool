import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import FormTeam from "./FormTeam";
import DialogForm from "../components/DialogForm";
import { NavLink } from "react-router-dom";
import TeamsAPI from "../services/teamsAPI";
import { toast } from "react-toastify";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
  });

  const addTeam = async (team) => {
    console.log(team);
    try {
      const response = await TeamsAPI.create(team);
      setDialogIsOpen(false);
      props.fetchTeams();
    } catch ({ response }) {
      if (response.status === 400) {
        toast.error("Une erreur est survenu lors de l'envoie des données");
      }
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        console.log(apiErrors);
        setErrors(apiErrors);
        toast.error("Des erreurs dans votre formulaire");
      }
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Divider />
        <List component="nav" aria-label="main mailbox folders">
          {props.teams.map((team) => {
            return (
              <NavLink to={`/teams/${team.id}/projects`} key={team.id}>
                <ListItem button>
                  <Tooltip
                    aria-label={team.name}
                    title={team.name}
                    placement="right"
                  >
                    <Button variant="contained" color="default">
                      {team.name.slice(0, 2)}
                    </Button>
                  </Tooltip>
                </ListItem>
                <Divider />
              </NavLink>
            );
          })}
        </List>

        <DialogForm
          dialogIsOpen={dialogIsOpen}
          setDialogIsOpen={setDialogIsOpen}
        >
          <FormTeam addTeam={addTeam} error={errors.name} />
        </DialogForm>
      </Drawer>
    </div>
  );
}
