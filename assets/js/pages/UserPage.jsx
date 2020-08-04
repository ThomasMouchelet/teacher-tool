import React, { useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";

const UserPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

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
    </>
  );
};

export default UserPage;
