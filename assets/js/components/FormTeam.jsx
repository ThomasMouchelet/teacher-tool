import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "../firebase";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import TeamsAPI from "../services/teamsAPI";
import UsersAPI from "../services/usersAPI";

import TeamPathContext from "../contexts/TeamPathContext";
import AdminContext from "../contexts/AdminContext";
import { RiChatCheckLine } from "react-icons/ri";

const FormTeam = (props) => {
  const { isAdmin } = useContext(AdminContext);
  const [team, setTeam] = useState({});
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    identifier: "",
  });
  const history = useHistory();
  const { setTeamPath } = useContext(TeamPathContext);

  const getTeam = async () => {
    try {
      const team = await TeamsAPI.findOne(props.team_id);
      setTeam(team);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.team_id !== "new") {
      getTeam();
      setEditing(true);
    }
  }, [props.team_id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setTeam({
      ...team,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userID;
    let teamID;
    if (!isAdmin) {
      try {
        userID = await UsersAPI.getUserID();
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await TeamsAPI.findOne(team.identifier);
        teamID = response.id;
      } catch (error) {
        console.log(error);
      }

      const db = firebase.firestore();
      const dateTime = String(Date.now());
      db.collection("studentRequest").doc(dateTime).set({
        userID,
        teamID,
        accepted: false,
      });
    }
    if (isAdmin) {
      try {
        if (editing) {
          await TeamsAPI.update(team.id, team);
          toast.success("Modifié avec succès");
        } else {
          const teamAdded = await TeamsAPI.create(team);
          props.setDialogIsOpen(false);
          setTeamPath(`/teams/${teamAdded.id}`);
          toast.success("Ajouté avec succès");
        }
      } catch ({ response }) {
        const { violations } = response.data;

        if (violations) {
          const apiErrors = {};
          violations.forEach(({ propertyPath, message }) => {
            apiErrors[propertyPath] = message;
          });

          setErrors(apiErrors);
          toast.error("Des erreurs dans votre formulaire");
        }
      }
    }
  };

  const handleDelete = async () => {
    try {
      await TeamsAPI.deleteTeam(team.id);
      toast.success("La team a bien été supprimée");
      history.push("/");
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editing ? "Modifier la" : "Ajouter une"} Team</h2>
      {isAdmin ? (
        <>
          <FormControl error={errors.name ? true : false}>
            <TextField
              label="Name"
              name="name"
              defaultValue={team.name}
              value={team.name || ""}
              onChange={handleChange}
            />
            <FormHelperText id="component-error-text">
              {errors.name}
            </FormHelperText>
          </FormControl>
        </>
      ) : (
        <>
          <FormControl error={errors.name ? true : false}>
            <TextField
              label="Identifier"
              name="identifier"
              defaultValue={team.identifier}
              value={team.identifier || ""}
              onChange={handleChange}
            />
            <FormHelperText id="component-error-text">
              {errors.name}
            </FormHelperText>
          </FormControl>
        </>
      )}
      <FormControl>
        <Button variant="contained" color="primary" type="submit">
          {editing ? "Modifier" : "Ajouter"}
        </Button>
      </FormControl>
      {editing && (
        <FormControl>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={handleDelete}
          >
            Supprimer la team
          </Button>
        </FormControl>
      )}
    </form>
  );
};

export default FormTeam;
