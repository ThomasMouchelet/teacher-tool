import React, { useState, useEffect } from "react";
import TeamsAPI from "../services/teamsAPI";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import { ListItem, Divider } from "@material-ui/core";

const TeamsPage = (props) => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const data = await TeamsAPI.findAll();
      setTeams(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);
  return (
    <>
      <h1>Liste des teams</h1>
      <List component="nav" aria-label="main mailbox folders">
        {teams.map((team) => {
          return (
            <Link to={`/teams/${team.id}/projects`} key={team.id}>
              <ListItem button>
                <strong>{team.name}</strong>
              </ListItem>
              <Divider />
            </Link>
          );
        })}
      </List>
    </>
  );
};

export default TeamsPage;
