import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import ProjectsAPI from "../services/projectsAPI";
import moment from "moment";
import TeamPathContext from "../contexts/TeamPathContext";

const ProjectPage = (props) => {
  const { id } = props.match.params;
  const [project, setProject] = useState({});
  const { teamPath } = useContext(TeamPathContext);

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
      <Link to={`${teamPath}/projects`}>
        <Button variant="contained" color="primary">
          <GoChevronLeft />
          Retour aux projets
        </Button>
      </Link>
      <h1>{project.name}</h1>
      <div>{project.description}</div>
      <div>jusqu'au : {moment(project.endingAt).format("DD/MM/YYYY")}</div>
    </>
  );
};

export default ProjectPage;
