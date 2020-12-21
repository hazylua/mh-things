import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import FilterTable from "../pages/FilterTablePage";
import ArmorSetSearcher from "../pages/SetSearcherPage";
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

import "./App.css";

const Navbar = () => (
  <div className="header">
    <div className="header-title">
      <NavLink
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
        to="/"
      >
        <h1>MH_THINGS</h1>
      </NavLink>
    </div>
    <nav className="header-nav">
      <ul>
        <li>
          <NavLink
            className="navbar-link"
            activeClassName="navbar-link-active"
            exact
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navbar-link"
            activeClassName="navbar-link-active"
            to="/skill-filter"
          >
            Filter Page
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navbar-link"
            activeClassName="navbar-link-active"
            to="/ass"
          >
            Armor Set Searcher
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navbar-link"
            activeClassName="navbar-link-active"
            to="/register"
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navbar-link"
            activeClassName="navbar-link-active"
            to="/login"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navbar-link"
            activeClassName="navbar-link-active"
            to="/about"
          >
            About
          </NavLink>
        </li>

      </ul>
    </nav>
  </div>
);

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/skill-filter" component={FilterTable} />
      <Route path="/ass" component={ArmorSetSearcher} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/about" component={AboutPage} />
    </Switch>
  </div>
);

const App = () => (
  <Router>
    <Navbar />
    <Main />
  </Router>
);

export default App;
