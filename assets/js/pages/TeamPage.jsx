import React, { useState, useEffect } from "react";
import TeamsAPI from "../services/teamsAPI";
import FormTeam from "../components/FormTeam";

const TeamPage = (props) => {
  const { team_id } = props.match.params;

  return <FormTeam team_id={team_id} />;
};

export default TeamPage;
