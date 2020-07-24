import React, { useState, useEffect } from "react";
import StudentsAPI from "../services/studentsAPI";
import List from "@material-ui/core/List";
import { ListItem, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ListItemText from "@material-ui/core/ListItemText";

const StudentsPage = (props) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const data = await StudentsAPI.findAllTeamsStudents(
        props.match.params.team_id
      );
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
    props.updateTeamPath(props.match.params.team_id);
  }, [props.match.params.team_id]);

  return (
    <div>
      <div>
        <h1>Liste des étudiants</h1>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        {students.map((student) => {
          return (
            <Link
              to={`/teams/${props.match.params.team_id}/students/${student.id}`}
              key={student.id}
            >
              <List>
                <ListItem button>
                  <ListItemText
                    primary={student.lastName + " " + student.firstName}
                    secondary="Student"
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

export default StudentsPage;
