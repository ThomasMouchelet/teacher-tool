import "../css/app.css";
import ReactDom from "react-dom";
import React, { useState, useEffect } from "react";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthContext from "./contexts/AuthContext";
import TeamPathContext from "./contexts/TeamPathContext";
import AdminContext from "./contexts/AdminContext";

import AuthAPI from "./services/authAPI";
import TeamsAPI from "./services/teamsAPI";
import UsersAPI from "./services/usersAPI";

import DrawerNav from "./components/Drawer";
import TabBar from "./components/TabBar";
import PrivateRoute from "./components/PrivateRoute";

import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import StudentsPage from "./pages/StudentsPage";
import StudentPage from "./pages/StudentPage";
import TeamPage from "./pages/TeamPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

import Container from "@material-ui/core/Container";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );
  const [isAdmin, setIsAdmin] = useState(UsersAPI.isAdmin());
  const DrawerNavWithRouter = withRouter(DrawerNav);
  const TabBarWithRouter = withRouter(TabBar);
  const [teams, setTeams] = useState([]);
  const [teamPath, setTeamPath] = useState(TeamPathContext);

  useEffect(() => {
    AuthAPI.setup();
    AuthAPI.isAuthenticated();
    fetchTeams();
  }, [teamPath]);

  const fetchTeams = async () => {
    try {
      const data = await TeamsAPI.findAll();
      setTeams(data);
      if (!teamPath) {
        updateTeamPath(teams[0].id);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <AdminContext.Provider
        value={{
          isAdmin,
          setIsAdmin,
        }}
      >
        <TeamPathContext.Provider
          value={{
            teamPath,
            setTeamPath,
          }}
        >
          <HashRouter>
            <Container maxWidth="xl">
              <Grid container spacing={2}>
                <Grid item sm={1}>
                  {isAuthenticated && <DrawerNavWithRouter teams={teams} />}
                </Grid>
                <Grid item sm={11}>
                  {isAuthenticated && <TabBarWithRouter teamPath={teamPath} />}
                  <Switch>
                    <Route
                      path="/login"
                      render={(props) => <LoginPage {...props} />}
                    />
                    <Route
                      path="/register"
                      render={(props) => <RegisterPage {...props} />}
                    />

                    <PrivateRoute path="/users/:id" component={UserPage} />
                    <PrivateRoute
                      path="/teams/:team_id/projects/:id"
                      component={ProjectPage}
                    />
                    <PrivateRoute
                      path="/teams/:team_id/students/:id"
                      component={StudentPage}
                    />
                    <PrivateRoute
                      path="/teams/:team_id/projects"
                      component={ProjectsPage}
                    />
                    <PrivateRoute
                      path="/teams/:team_id/students"
                      component={StudentsPage}
                    />
                    <PrivateRoute path="/teams/:team_id" component={TeamPage} />
                    <Route path="*" exact={true} component={LoginPage} />
                  </Switch>
                </Grid>
              </Grid>
            </Container>
          </HashRouter>
        </TeamPathContext.Provider>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </AdminContext.Provider>
    </AuthContext.Provider>
  );
};

const rootElement = document.getElementById("app");
ReactDom.render(<App />, rootElement);
