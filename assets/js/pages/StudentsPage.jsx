import React, { useState, useEffect } from "react";
import StudentsAPI from "../services/studentsAPI";
import List from "@material-ui/core/List";
import { ListItem, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import DialogFormProject from "../components/DialogFormProject";
import FormStudent from "../components/FormStudent";
import Button from "@material-ui/core/Button";

const StudentsPage = (props) => {
  const [students, setStudents] = useState([]);
  const { team_id } = props.match.params;
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const fetchStudents = async () => {
    try {
      const data = await StudentsAPI.findAllTeamsStudents(team_id);
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
    props.updateTeamPath(team_id);
  }, [team_id]);

  const addStudent = async (student) => {
    try {
      const response = await StudentsAPI.create(student);
      console.log(response);
      setDialogIsOpen(false);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeamStudent = async (student) => {
    const originalStudents = [...students];
    setStudents(students.filter((s) => s.id !== student.id));

    try {
      const response = await StudentsAPI.deleteTeamStudent(student.id, team_id);
    } catch (error) {
      setStudents(originalStudents);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Liste des étudiants</h1>
        <DialogFormProject
          dialogIsOpen={dialogIsOpen}
          setDialogIsOpen={setDialogIsOpen}
        >
          <FormStudent
            teamID={team_id}
            fetchStudents={fetchStudents}
            addStudent={addStudent}
          />
        </DialogFormProject>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        {students.map((student) => {
          return (
            <li className="listItem" key={student.id}>
              <Link
                to={`/teams/${props.match.params.team_id}/students/${student.id}`}
              >
                <ListItem button>
                  <ListItemText
                    primary={student.lastName + " " + student.firstName}
                    secondary="Student"
                  />
                </ListItem>

                <Divider />
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteTeamStudent(student)}
              >
                Supprimer
              </Button>
            </li>
          );
        })}
      </List>
    </div>
  );
};

export default StudentsPage;
