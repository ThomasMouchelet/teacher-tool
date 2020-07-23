import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import ProjectsAPI from "../services/projectsAPI";
import moment from "moment";

const ProjectPage = (props) => {
  const { id } = props.match.params;
  const [project, setProject] = useState({});

  const getProject = async () => {
    try {
      const project = await ProjectsAPI.findOne(id);
      setProject(project);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <Link to={`/teams/${props.match.params.team_id}/projects`}>
        <Button variant="contained" color="primary">
          <GoChevronLeft />
          Retour aux projets
        </Button>
      </Link>
      <h1>{project.name}</h1>
      <div>{project.description}</div>
      <div>jusqu'au : {moment(project.endingDate).format("DD/MM/YYYY")}</div>
    </>
  );
};

export default ProjectPage;
