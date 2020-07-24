import React from "react";
import { STUDENTS_URL, TEAMS_URL } from "../config";
import axios from "axios";

function findAll() {
  return axios
    .get(`${STUDENTS_URL}`)
    .then((response) => response.data["hydra:member"]);
}
function findAllTeamsStudents(id) {
  return axios
    .get(`${TEAMS_URL}/${id}/students`)
    .then((response) => response.data["hydra:member"]);
}

function findOne(id) {
  return axios.get(`${STUDENTS_URL}/${id}`).then((response) => response.data);
}

export default {
  findAll,
  findAllTeamsStudents,
  findOne,
};
