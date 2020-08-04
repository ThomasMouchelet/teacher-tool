import React, { useContext, useEffect, useState } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import UsersAPI from "../services/usersAPI";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const UserPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  // Gestion de la soumission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiErrors = {};

    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
      setErrors(apiErrors);
      toast.error("Des erreurs dans votre formulaire !");
      return;
    }

    try {
      await UsersAPI.register(user);
      setErrors({});

      // TODO : Flash success
      toast.success(
        "Vous êtes désormais inscrit, vous pouvez vous connecter !"
      );
      history.replace("/login");
    } catch (error) {
      const { violations } = error.response.data;

      if (violations) {
        violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      toast.error("Des erreurs dans votre formulaire !");
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    // 2. Si le token est encore valide
    if (token) {
      const userJWT = jwtDecode(token);
      setUser({ ...userJWT, email: userJWT.username });
    }
  }, []);

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes désormais déconnecté 😁");
    history.push("/login");
  };

  return (
    <>
      <h1>Mon compte</h1>
      <button onClick={handleLogout} className="btn btn-danger">
        Déconnexion
      </button>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            name="firstName"
            label="Prénom"
            placeholder="Votre joli prénom"
            error={errors.firstName}
            value={user.firstName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            name="lastName"
            label="Nom de famille"
            placeholder="Votre nom de famille"
            error={errors.lastName}
            value={user.lastName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            name="email"
            label="Adresse email"
            placeholder="Votre adresse email"
            type="email"
            error={errors.email}
            value={user.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            name="password"
            label="Mot de passe"
            type="password"
            placeholder="Votre mot de passe ultra sécurisé"
            error={errors.password}
            value={user.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            name="passwordConfirm"
            label="Confirmer mot de passe"
            type="password"
            placeholder="Confirmez du mot de passe"
            error={errors.passwordConfirm}
            value={user.passwordConfirm}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <button type="submit" className="btn btn-success">
            Confirmation
          </button>
        </FormControl>
      </form>
    </>
  );
};

export default UserPage;
