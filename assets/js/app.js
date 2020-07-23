import "../css/app.css";
import ReactDom from "react-dom";
import React, { useState } from "react";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import Container from "@material-ui/core/Container";
import TeamsPage from "./pages/TeamsPage";

const App = () => {
  return (
    <HashRouter>
      <Container maxWidth="sm">
        <Switch>
          <Route path="/teams/:team_id/projects/:id" component={ProjectPage} />
          <Route path="/teams/:team_id/projects" component={ProjectsPage} />
          <Route path="/teams" component={TeamsPage} />
        </Switch>
      </Container>
    </HashRouter>
  );
};

const rootElement = document.getElementById("app");
ReactDom.render(<App />, rootElement);
