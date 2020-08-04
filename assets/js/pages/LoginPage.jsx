import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import TeamPathContext from "../contexts/TeamPathContext";
import teamsAPI from "../services/teamsAPI";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setTeamPath } = useContext(TeamPathContext);

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
      const firstTeam = await teamsAPI.getFirstTeam();
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
      </form>
    </>
  );
};
export default LoginPage;
