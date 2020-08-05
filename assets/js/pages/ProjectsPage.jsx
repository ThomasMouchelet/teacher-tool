import React, { useEffect, useState, useContext } from "react";

import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import ProjectsAPI from "../services/projectsAPI";

import TeamPathContext from "../contexts/TeamPathContext";
import AdminContext from "../contexts/AdminContext";

import FormProject from "../components/FormProject";
import DialogForm from "../components/DialogForm";

import ListItemText from "@material-ui/core/ListItemText";
import { ListItem, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

const ProjectsPage = (props) => {
  const [projects, setProjects] = useState([]);
  const { team_id } = props.match.params;
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { setTeamPath } = useContext(TeamPathContext);
  const { isAdmin } = useContext(AdminContext);

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
    setTeamPath(`/teams/${team_id}`);
    fetchProjects();
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

    // TODO : Optimiser le message de confirmation
    const confirm = window.confirm(
      "Are you sure you wish to delete this item?"
    );

    if (confirm) {
      try {
        const response = await ProjectsAPI.deleteProject(id);
      } catch (error) {
        setProjects(originalProjects);
        console.log(error);
      }
    } else {
      setProjects(originalProjects);
    }
  };

  return (
    <div>
      <div>
        <h1>Liste des projets</h1>
        {isAdmin && (
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
        )}
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
              {isAdmin && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(project.id)}
                >
                  Supprimer
                </Button>
              )}
              <Divider />
            </li>
          );
        })}
      </List>
    </div>
  );
};

export default ProjectsPage;
