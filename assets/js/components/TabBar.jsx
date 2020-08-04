import { NavLink } from "react-router-dom";

import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineProject } from "react-icons/ai";
import { AiOutlineNotification } from "react-icons/ai";
import { AiTwotoneSetting } from "react-icons/ai";
import { RiProfileLine } from "react-icons/ri";
import TeamPathContext from "../contexts/TeamPathContext";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { teamPath } = useContext(TeamPathContext);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showlabels={"true"}
      className={classes.root}
    >
      <NavLink to={`${teamPath}/projects`}>
        <BottomNavigationAction label="Flux" icon={<AiOutlineNotification />} />
      </NavLink>
      <NavLink to={`${teamPath}/projects`}>
        <BottomNavigationAction label="Projets" icon={<AiOutlineProject />} />
      </NavLink>
      <NavLink to={`${teamPath}/students`}>
        <BottomNavigationAction label="Etudiants" icon={<BsPeopleFill />} />
      </NavLink>
      <NavLink to={`${teamPath}`}>
        <BottomNavigationAction label="Setting" icon={<AiTwotoneSetting />} />
      </NavLink>
      <NavLink to="/users/6">
        <BottomNavigationAction label="Profil" icon={<RiProfileLine />} />
      </NavLink>
    </BottomNavigation>
  );
}
