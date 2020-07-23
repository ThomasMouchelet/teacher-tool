import React from "react";
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

export default {
  findAll,
  findOne,
};
