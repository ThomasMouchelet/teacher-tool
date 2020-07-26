import React, { useEffect, useState } from "react";
import ProjectsAPI from "../services/projectsAPI";
import List from "@material-ui/core/List";
import { ListItem, Divider } from "@material-ui/core";
import moment from "moment";
import { NavLink } from "react-router-dom";
import DialogForm from "../components/DialogForm";
import ListItemText from "@material-ui/core/ListItemText";
import FormProject from "../components/FormProject";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

const ProjectsPage = (props) => {
  const [projects, setProjects] = useState([]);
  const { team_id } = props.match.params;
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
  });

  const fetchProjects = async () => {
    try {
      const data = await ProjectsAPI.findAllTeamsProjects(team_id);
      setProjects(data);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors du chargement des données !");
    }
  };

  useEffect(() => {
    fetchProjects();
    props.updateTeamPath(team_id);
  }, [team_id]);

  const addProject = async (project) => {
    try {
      const response = await ProjectsAPI.create(project);
      setDialogIsOpen(false);
      fetchProjects();
    } catch ({ response }) {
      console.log(response);
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

  const handleDelete = async (id) => {
    const originalProjects = [...projects];

    setProjects(projects.filter((p) => p.id !== id));

    try {
      const response = await ProjectsAPI.deleteProject(id);
    } catch (error) {
      setProjects(originalProjects);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Liste des projets</h1>
        <DialogForm
          dialogIsOpen={dialogIsOpen}
          setDialogIsOpen={setDialogIsOpen}
        >
          <FormProject
            teamID={team_id}
            fetchProjects={fetchProjects}
            addProject={addProject}
            errors={errors}
          />
        </DialogForm>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        {projects.map((project) => {
          return (
            <li className="listItem" key={project.id}>
              <NavLink to={`/teams/${team_id}/projects/${project.id}`}>
                <ListItem button>
                  <ListItemText
                    primary={project.name}
                    secondary={moment(project.endingAt).format("DD/MM/YYYY")}
                  />
                </ListItem>
              </NavLink>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(project.id)}
              >
                Supprimer
              </Button>
              <Divider />
            </li>
          );
        })}
      </List>
    </div>
  );
};

export default ProjectsPage;
