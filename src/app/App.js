import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouteConfig from "../routes";
import "./App.css";

const App = () => (
  <Router>
    <RouteConfig></RouteConfig>
  </Router>
);

export default App;
