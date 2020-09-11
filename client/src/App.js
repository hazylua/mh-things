import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import FilterTable from "./pages/FilterTablePage";
import ArmorSetSearcher from "./pages/SetSearcherPage";
import Authentication from "./pages/AuthPage";

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
            to="/auth"
          >
            Sign Up/In
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
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/skill-filter" component={FilterTable} />
      <Route path="/ass" component={ArmorSetSearcher} />
      <Route path="/auth" component={Authentication} />
    </Switch>
  </div>
);

const Home = () => (
  <Container>
    <Row>
      <Col className="content-panels" style={{ marginRight: "10px" }}>
        <div>
          <h4>What is this?</h4>
          <p>
            A webpage with a collection of assorted tools related to the Monster
            Hunter series.
          </p>
          <p>
            At the moment the page is incomplete, but there's a filter page that
            let's you find the location of a skill from the decoration filter
            page. An armor set searcher is also planned to be implemented.
          </p>
        </div>
      </Col>
      <Col className="content-panels" style={{ marginLeft: "10px" }}>
        <div>
          <h4>Other</h4>
          <p>Other websites you might want to check out:</p>
          <div style={{ display: "grid" }}>
            <a href="https://mhworld.kiranico.com/">
              https://mhworld.kiranico.com/
            </a>
            <a href="https://mhw.wiki-db.com/sim/?hl=en">
              https://mhw.wiki-db.com/sim/?hl=en
            </a>
            <a href="https://mhwleaderboards.com/">
              https://mhwleaderboards.com/
            </a>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);

const About = () => (
  <Container>
    <Col>
      <h2>About:</h2>
      <p>
        Source code for this page is here:
        <br />
        <a href="https://github.com/yb00/mh-things">
          https://github.com/yb00/mh-things
        </a>
      </p>
    </Col>
  </Container >
);

const App = () => (
  <Router>
    <Navbar />
    <Main />
  </Router>
);

export default App;
