import React, { useEffect, useState } from "react";
import ProjectsAPI from "../services/projectsAPI";
import List from "@material-ui/core/List";
import { ListItem, Divider } from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import DialogFormProject from "../components/DialogFormProject";
import ListItemText from "@material-ui/core/ListItemText";

const ProjectsPage = (props) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const data = await ProjectsAPI.findAllTeamsProjects(
        props.match.params.team_id
      );
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    props.setTeamID(props.match.params.team_id);
  }, [props.match.params.team_id]);

  return (
    <div>
      <div>
        <h1>Liste des projets</h1>
        <DialogFormProject
          teamID={props.match.params.team_id}
          fetchProjects={fetchProjects}
        />
      </div>
      <List component="nav" aria-label="main mailbox folders">
        {projects.map((project) => {
          return (
            <Link
              to={`/teams/${props.match.params.team_id}/projects/${project.id}`}
              key={project.id}
            >
              <List>
                <ListItem button>
                  <ListItemText
                    primary={project.name}
                    secondary={moment(project.endingAt).format("DD/MM/YYYY")}
                  />
                </ListItem>
                <Divider />
              </List>
            </Link>
          );
        })}
      </List>
    </div>
  );
};

export default ProjectsPage;
