import { STUDENTS_URL, TEAMS_URL } from "../config";
import axios from "axios";

function findAll() {
  return axios
    .get(`${STUDENTS_URL}`)
    .then((response) => response.data["hydra:member"]);
}
function findAllTeamsStudents(id) {
  return axios
    .get(`${TEAMS_URL}/${id}/users`)
    .then((response) => response.data["hydra:member"]);
}

function findOne(id) {
  return axios.get(`${STUDENTS_URL}/${id}`).then((response) => response.data);
}

function create(student) {
  return axios
    .post(STUDENTS_URL, {
      ...student,
      teams: ["api/teams/" + student.team],
    })
    .then(async (response) => {
      return response;
    });
}

function deleteStudent(id) {
  return axios.delete(`${STUDENTS_URL}/${id}`);
}

async function deleteTeamStudent(id, team_id) {
  const student = await findOne(id);
  const deletedTeam = `/api/teams/${team_id}`;
  const studentTeams = [...student.teams];
  const newTeams = studentTeams.filter((t) => t !== deletedTeam);

  return axios.put(`${STUDENTS_URL}/${id}`, {
    ...student,
    teams: newTeams,
  });
}

export default {
  findAll,
  findAllTeamsStudents,
  findOne,
  create,
  deleteTeamStudent,
  deleteStudent,
};
