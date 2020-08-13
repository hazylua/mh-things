import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import FilterTable from "./pages/FilterTable";
import ArmorSetSearcher from "./pages/ArmorSetSearcher";
import Register from "./pages/Register";

import "./App.css";

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link className="navbar-link" to="/mh-things/">
          Home
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/mh-things/skill-filter">
          Filter Page
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/mh-things/ass">
          Armor Set Searcher
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/mh-things/register">
          Register
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/mh-things/about">
          About
        </Link>
      </li>
    </ul>
  </nav>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/mh-things" component={Home} />
      <Route path="/mh-things/about" component={About} />
      <Route path="/mh-things/skill-filter" component={FilterTable} />
      <Route path="/mh-things/ass" component={ArmorSetSearcher} />
      <Route path="/mh-things/register" component={Register} />
    </Switch>
  </main>
);

const Home = () => (
  <div>
    <h1 className="page-title">Home Page</h1>
    <Container>
      <Row>
        <Col>
          <div>
            <h5>What is this?</h5>
            <p>
              A webpage with a collection of assorted tools related to the game
              Monster Hunter World: Iceborne.
            </p>
            <p>
              At the moment the page is incomplete, but there's a filter page
              that let's you find the location of a skill from the decoration
              filter page. An armor set searcher is also planned to be
              implemented.
            </p>
          </div>
        </Col>
        <Col>
          <h5>Other</h5>
          <div>
            <p>Other websites you can check out:</p>
            <table>
              <tbody>
                <tr>
                  <td>
                    <a href="https://mhwleaderboards.com/rules">
                      https://mhwleaderboards.com/rules
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://honeyhunterworld.com/">
                      https://honeyhunterworld.com/
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://mhw.wiki-db.com/sim/?hl=en">
                      https://mhw.wiki-db.com/sim/?hl=en
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

const About = () => (
  <div>
    <h2 className="page-title">About</h2>

    <p>
      If you want to take a look at how this page works go to it's repository
      at:
    </p>
    <p>
      <a href="https://github.com/yb00/mh-things">
        https://github.com/yb00/mh-things
      </a>
    </p>
  </div>
);

// const App = () => (
//   <Router>
//     <Navbar />
//     <Main />
//   </Router>
// )

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  componentDidMount() {
    const titles = ["MonHun Things"];
    document.title = titles[Math.floor(Math.random() * titles.length)];
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar />
          <Main />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
