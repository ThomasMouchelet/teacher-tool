import React, { useState, useContext } from "react";

import AuthContext from "../contexts/AuthContext";
import TeamPathContext from "../contexts/TeamPathContext";
import AdminContext from "../contexts/AdminContext";

import AuthAPI from "../services/authAPI";
import TeamsAPI from "../services/teamsAPI";
import UsersAPI from "../services/usersAPI";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setTeamPath } = useContext(TeamPathContext);
  const { setIsAdmin } = useContext(AdminContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  // Gestion du submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      setIsAdmin(UsersAPI.isAdmin());
      const firstTeam = await TeamsAPI.getFirstTeam();
      setTeamPath(`/teams/${firstTeam.id}`);
      history.replace("/");
    } catch (error) {
      setError(
        "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !"
      );
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <>
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            label="username"
            name="username"
            onChange={handleChange}
            value={credentials.username}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
            type="password"
          />
        </FormControl>
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Je me connecte
          </button>
        </div>
        <Link to="/register" className="btn btn-link">
          Créer un compte
        </Link>
      </form>
    </>
  );
};
export default LoginPage;
