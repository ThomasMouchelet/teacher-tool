import React, { useEffect, useState } from "react";
import ProjectsAPI from "../services/projectsAPI";
import List from "@material-ui/core/List";
import { ListItem, Divider } from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { GoChevronLeft } from "react-icons/go";

const ProjectsPage = (props) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const data = await ProjectsAPI.findAllTeamsProjects(
        props.match.params.team_id
      );
      setProjects(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Link to="/teams">
        <Button variant="contained" color="primary">
          <GoChevronLeft />
          Retour aux teams
        </Button>
      </Link>
      <h1>Liste des projets</h1>
      <List component="nav" aria-label="main mailbox folders">
        {projects.map((project) => {
          return (
            <Link
              to={`/teams/${props.match.params.team_id}/projects/${project.id}`}
              key={project.id}
            >
              <ListItem button>
                <strong>{project.name}</strong> - pour le:{" "}
                {moment(project.endingDate).format("DD/MM/YYYY")}
              </ListItem>
              <Divider />
            </Link>
          );
        })}
      </List>
    </>
  );
};

export default ProjectsPage;
