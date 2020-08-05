import React, { useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import UsersAPI from "../services/usersAPI";

import FormUser from "../components/FormUser";

const RegisterPage = () => {
  return (
    <>
      <h1>Créer un compte</h1>
      <FormUser />
      <Link to="/login" className="btn btn-link">
        Déja un compte ?
      </Link>
    </>
  );
};
export default RegisterPage;
