import React from "react";
import { PROJECTS_URL, TEAMS_URL } from "../config";
import axios from "axios";

function findAll() {
  return axios
    .get(`${PROJECTS_URL}`)
    .then((response) => response.data["hydra:member"]);
}
function findAllTeamsProjects(id) {
  return axios
    .get(`${TEAMS_URL}/${id}/projects`)
    .then((response) => response.data["hydra:member"]);
}

function findOne(id) {
  return axios.get(`${PROJECTS_URL}/${id}`).then((response) => response.data);
}

export default {
  findAll,
  findAllTeamsProjects,
  findOne,
};
