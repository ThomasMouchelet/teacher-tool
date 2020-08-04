import React, { useState, useEffect, useContext } from "react";
import StudentsAPI from "../services/studentsAPI";
import List from "@material-ui/core/List";
import { ListItem, Divider } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import DialogForm from "../components/DialogForm";
import FormStudent from "../components/FormStudent";
import Button from "@material-ui/core/Button";
import TeamPathContext from "../contexts/TeamPathContext";
import { toast } from "react-toastify";

const StudentsPage = (props) => {
  const [students, setStudents] = useState([]);
  const { team_id } = props.match.params;
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { setTeamPath } = useContext(TeamPathContext);

  const fetchStudents = async () => {
    try {
      const data = await StudentsAPI.findAllTeamsStudents(team_id);
      setStudents(data);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors du chargement des données !");
    }
  };

  useEffect(() => {
    fetchStudents();
    setTeamPath(`/teams/${team_id}`);
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

    // TODO : Optimiser le message de confirmation
    const confirm = window.confirm(
      "Are you sure you wish to delete this item?"
    );
    if (confirm) {
      try {
        const response = await StudentsAPI.deleteTeamStudent(
          student.id,
          team_id
        );
      } catch (error) {
        setStudents(originalStudents);
        console.log(error);
        toast.error("Une erreur est survenue");
      }
    } else {
      setStudents(originalStudents);
    }
  };

  return (
    <div>
      <div>
        <h1>Liste des étudiants</h1>
        <DialogForm
          dialogIsOpen={dialogIsOpen}
          setDialogIsOpen={setDialogIsOpen}
        >
          <FormStudent
            teamID={team_id}
            fetchStudents={fetchStudents}
            addStudent={addStudent}
          />
        </DialogForm>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        {students.map((student) => {
          return (
            <li className="listItem" key={student.id}>
              <NavLink
                to={`/teams/${props.match.params.team_id}/students/${student.id}`}
              >
                <ListItem button>
                  <ListItemText
                    primary={student.lastName + " " + student.firstName}
                    secondary="Student"
                  />
                </ListItem>

                <Divider />
              </NavLink>
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
