import axios from "axios";
import { USERS_URL, TEAMS_URL } from "../config";
import jwtDecode from "jwt-decode";

function register(user) {
  return axios.post(USERS_URL, user);
}

function update(id, user) {
  return axios
    .put(USERS_URL + "/" + id, user)
    .then((response) => response.data);
}

function findAllTeamsStudents(id) {
  return axios
    .get(`${TEAMS_URL}/${id}/students`)
    .then((response) => response.data["hydra:member"]);
}

function deleteUser(id) {
  return axios.delete(`${USERS_URL}/${id}`);
}

function findOne(id) {
  return axios.get(`${USERS_URL}/${id}`).then((response) => response.data);
}

function create(user) {
  return axios.post(USERS_URL, user).then(async (response) => {
    return response;
  });
}

function isAdmin() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { roles } = jwtDecode(token);
    return roles.includes("ROLE_TEACHER") ? true : false;
  }
}

function getUserID() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { id } = jwtDecode(token);
    return id;
  }
}

export default {
  register,
  update,
  findOne,
  findAllTeamsStudents,
  deleteUser,
  create,
  isAdmin,
  getUserID,
};
