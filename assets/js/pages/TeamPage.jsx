import React, { useState, useEffect } from "react";
import TeamsAPI from "../services/teamsAPI";
import FormTeam from "../components/FormTeam";
import { toast } from "react-toastify";

const TeamPage = (props) => {
  const { team_id } = props.match.params;
  const [team, setTeam] = useState({});

  const getTeam = async () => {
    try {
      const team = await TeamsAPI.findOne(team_id);
      setTeam(team);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTeam(team);
  };

  return <FormTeam addTeam={addTeam} error={errors.name} />;
};

export default TeamPage;
