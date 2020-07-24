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

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const data = await TeamsAPI.findAll();
      setTeams(data);
      if (!teamID) {
        setTeamID(data[0].id);
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
            <DrawerNavWithRouter teams={teams} />
          </Grid>
          <Grid item sm={11}>
            <TabBarWithRouter teamID={teamID} />
            <Switch>
              <Route
                path="/teams/:team_id/projects/:id"
                component={ProjectPage}
              />
              <Route
                path="/teams/:team_id/students/:id"
                component={StudentPage}
              />
              <Route
                path="/teams/:team_id/projects"
                render={(props) => (
                  <ProjectsPage {...props} setTeamID={setTeamID} />
                )}
              />
              <Route
                path="/teams/:team_id/students"
                render={(props) => (
                  <StudentsPage {...props} setTeamID={setTeamID} />
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
