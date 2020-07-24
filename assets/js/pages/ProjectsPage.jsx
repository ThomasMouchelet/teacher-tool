import React, { useEffect, useState } from "react";
import ProjectsAPI from "../services/projectsAPI";
import List from "@material-ui/core/List";
import { ListItem, Divider } from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import DialogFormProject from "../components/DialogFormProject";
import ListItemText from "@material-ui/core/ListItemText";
import FormProject from "../components/FormProject"

const ProjectsPage = (props) => {
  const [projects, setProjects] = useState([]);
  const { team_id } = props.match.params;
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const fetchProjects = async () => {
    try {
      const data = await ProjectsAPI.findAllTeamsProjects(team_id);
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    props.updateTeamPath(team_id);
  }, [team_id]);

  const addProject = async (project) => {
    try {
      await ProjectsAPI.create(project);
      setDialogIsOpen(false);
      fetchProjects();
    } catch ( error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Liste des projets</h1>
        <DialogFormProject dialogIsOpen={dialogIsOpen} setDialogIsOpen={setDialogIsOpen}>
          <FormProject teamID={team_id} fetchProjects={fetchProjects} addProject={addProject} />
        </DialogFormProject>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        {projects.map((project) => {
          return (
            <Link
              to={`/teams/${team_id}/projects/${project.id}`}
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
