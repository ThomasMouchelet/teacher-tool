import { TEAMS_URL } from "../config";
import axios from "axios";

function findAll() {
  return axios
    .get(`${TEAMS_URL}`)
    .then((response) => response.data["hydra:member"]);
}
function findOne(id) {
  return axios.get(`${TEAMS_URL}/${id}`).then((response) => response.data);
}

function create(team) {
  return axios.post(TEAMS_URL, team).then((response) => response.data);
}

function update(id, team) {
  return axios.put(TEAMS_URL + "/" + id, team);
}

function deleteTeam(id) {
  return axios.delete(TEAMS_URL + "/" + id);
}

function getFirstTeam() {
  return axios
    .get(`${TEAMS_URL}`)
    .then((response) => response.data["hydra:member"][0]);
}

function addUser(user_id, team_id) {
  console.log(user_id);
  console.log(team_id);
  return axios
    .post(`${TEAMS_URL}/${team_id}/students`, { id: user_id })
    .then((response) => response.data["hydra:member"]);
}

export default {
  findAll,
  findOne,
  create,
  update,
  deleteTeam,
  getFirstTeam,
  addUser,
};
