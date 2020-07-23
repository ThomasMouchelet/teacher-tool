import "../css/app.css";
import ReactDom from "react-dom";
import React, { useState } from "react";

const App = () => {
  return <h1>React app</h1>;
};

const rootElement = document.getElementById("app");
ReactDom.render(<App />, rootElement);
