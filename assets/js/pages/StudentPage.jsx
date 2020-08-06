import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import UsersAPI from "../services/usersAPI";
import TeamPathContext from "../contexts/TeamPathContext";

const StudentPage = (props) => {
  const { id } = props.match.params;
  const [student, setStudent] = useState({});
  const { teamPath } = useContext(TeamPathContext);

  const getStudent = async () => {
    try {
      const student = await UsersAPI.findOne(id);
      setStudent(student);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <>
      <Link to={`${teamPath}/students`}>
        <Button variant="contained" color="primary">
          <GoChevronLeft />
          Retour aux etudiants
        </Button>
      </Link>
      <h1>
        {student.firstName} {student.lastName}
      </h1>
      <div>{student.email}</div>
    </>
  );
};

export default StudentPage;
