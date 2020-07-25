import "../css/app.css";
import ReactDom from "react-dom";
import React, { useState, useEffect } from "react";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import Container from "@material-ui/core/Container";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import DrawerNav from "./components/Drawer";
import TabBar from "./components/TabBar";
import TeamsAPI from "./services/teamsAPI";
import StudentsPage from "./pages/StudentsPage";
import StudentPage from "./pages/StudentPage";

const App = () => {
  const DrawerNavWithRouter = withRouter(DrawerNav);
  const TabBarWithRouter = withRouter(TabBar);

  const [teamID, setTeamID] = useState(null);
  const [teams, setTeams] = useState([]);
  const [teamPath, setTeamPath] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const updateTeamPath = (id) => {
    setTeamPath(`/teams/${id}`);
  };

  const fetchTeams = async () => {
    try {
      const data = await TeamsAPI.findAll();
      setTeams(data);
      if (!teamPath) {
        updateTeamPath(data[0].id);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <HashRouter>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={1}>
            <DrawerNavWithRouter teams={teams} fetchTeams={fetchTeams} />
          </Grid>
          <Grid item sm={11}>
            <TabBarWithRouter teamPath={teamPath} />
            <Switch>
              <Route
                path="/teams/:team_id/projects/:id"
                render={(props) => (
                  <ProjectPage {...props} teamPath={teamPath} />
                )}
              />
              <Route
                path="/teams/:team_id/students/:id"
                render={(props) => (
                  <StudentPage {...props} teamPath={teamPath} />
                )}
              />
              <Route
                path="/teams/:team_id/projects"
                render={(props) => (
                  <ProjectsPage {...props} updateTeamPath={updateTeamPath} />
                )}
              />
              <Route
                path="/teams/:team_id/students"
                render={(props) => (
                  <StudentsPage {...props} updateTeamPath={updateTeamPath} />
                )}
              />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </HashRouter>
  );
};

const rootElement = document.getElementById("app");
ReactDom.render(<App />, rootElement);
