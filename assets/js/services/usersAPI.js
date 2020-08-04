import axios from "axios";
import { USERS_API } from "../config";

function register(user) {
  return axios.post(USERS_API, user);
}
function update(id, user) {
  return axios
    .put(USERS_API + "/" + id, user)
    .then((response) => response.data);
}

function findOne(id) {
  return axios.get(`${USERS_API}/${id}`).then((response) => response.data);
}

export default {
  register,
  update,
  findOne,
};
