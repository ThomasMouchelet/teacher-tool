import React, { useContext, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import AuthAPI from "../services/authAPI";

import AuthContext from "../contexts/AuthContext";

import FormUser from "../components/FormUser";

import { toast } from "react-toastify";

const UserPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();

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
      <FormUser />
    </>
  );
};

export default UserPage;
