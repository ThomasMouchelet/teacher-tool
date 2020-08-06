import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import TeamPathContext from "../contexts/TeamPathContext";
import AdminContext from "../contexts/AdminContext";
import RequestStudentsTeamContext from "../contexts/RequestStudentsTeamContext";

import UsersAPI from "../services/usersAPI";

import ListItemText from "@material-ui/core/ListItemText";
import { ListItem, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

import { toast } from "react-toastify";
import TeamsAPI from "../services/teamsAPI";

import firebase from "../firebase";

const StudentsPage = (props) => {
  const [students, setStudents] = useState([]);
  const { team_id } = props.match.params;
  const { setTeamPath } = useContext(TeamPathContext);
  const { isAdmin } = useContext(AdminContext);
  const { requestStudentsTeam, setRequestStudentsTeam } = useContext(
    RequestStudentsTeamContext
  );
  const [studentsWaiting, setStudentsWaiting] = useState([]);

  const fetchStudents = async () => {
    try {
      const data = await UsersAPI.findAllTeamsStudents(team_id);
      setStudents(data);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors du chargement des données !");
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchStudentsWRequest();
    setTeamPath(`/teams/${team_id}`);
  }, [team_id, requestStudentsTeam]);

  const fetchStudentsWRequest = async () => {
    setStudentsWaiting([]);
    Object.keys(requestStudentsTeam).map(async (request) => {
      const userID = requestStudentsTeam[request];
      try {
        const user = await UsersAPI.findOne(userID);
        setStudentsWaiting([...studentsWaiting, user]);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const acceptTeamStudent = async (student) => {
    try {
      const response = await TeamsAPI.addUser(student.id, team_id);
      setStudents(response);
      const db = firebase.firestore();
      db.collection("studentRequest")
        .get()
        .then((res) => {
          res.forEach((element) => {
            if (
              element.data().userID == student.id &&
              element.data().teamID == team_id
            ) {
              element.ref.set({ ...element.data(), accepted: true });
            }
          });
        });
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue");
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
        const response = await UsersAPI.deleteUser(student.id, team_id);
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
      {Object.keys(requestStudentsTeam).length > 0 && (
        <>
          <div>
            <h1>Liste des demandes</h1>
          </div>
          <List component="nav" aria-label="main mailbox folders">
            {studentsWaiting.map((student) => {
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
                  {isAdmin && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => acceptTeamStudent(student)}
                    >
                      Accepter
                    </Button>
                  )}
                </li>
              );
            })}
          </List>
        </>
      )}

      <div>
        <h1>Liste des étudiants</h1>
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
              {isAdmin && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteTeamStudent(student)}
                >
                  Supprimer
                </Button>
              )}
            </li>
          );
        })}
      </List>
    </div>
  );
};

export default StudentsPage;
