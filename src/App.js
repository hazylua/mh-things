import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import FilterTable from './pages/FilterTable'

import './App.css'

const repo = "mh-things"
console.log(repo)
const Navbar = () => (
  <nav>
    <ul>
      <li><Link className="navbar-link" to="/mh-things/">Home</Link></li>
      <li><Link className="navbar-link" to="/mh-things/about">About</Link></li>
      <li><Link className="navbar-link" to="/mh-things/skill-filter">Filter Page</Link></li>
    </ul>
  </nav>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/mh-things" component={Home} />
      <Route path="/mh-things/about" component={About} />
      <Route path="/mh-things/skill-filter" component={FilterTable} />
    </Switch>
  </main>
)

const Home = () => (
  <div>
    <h1 className="page-title">Home Page</h1>
    <p>Elit ullamco id labore fugiat esse mollit deserunt culpa nisi adipisicing irure reprehenderit ipsum.</p>
    <p>Ex ut exercitation quis id eiusmod cillum deserunt culpa proident exercitation fugiat aliquip Lorem. Ipsum aliqua in tempor irure laboris reprehenderit veniam nostrud pariatur ex eiusmod labore deserunt nisi. Nulla enim consequat pariatur occaecat ullamco nostrud voluptate est anim voluptate. Voluptate reprehenderit labore et proident id et mollit irure ut. Dolore ea quis aute tempor ad nostrud ut cillum anim tempor aute reprehenderit. Ea eu sint est fugiat laborum cillum exercitation dolor non eu quis minim minim deserunt. Fugiat aliquip dolor culpa ut mollit mollit enim.</p>
  </div>
)

const About = () => (
  <div>
    <h1 className="page-title">About</h1>

    <p>Elit ullamco id labore fugiat esse mollit deserunt culpa nisi adipisicing irure reprehenderit ipsum.</p>
    <p>Ex ut exercitation quis id eiusmod cillum deserunt culpa proident exercitation fugiat aliquip Lorem. Ipsum aliqua in tempor irure laboris reprehenderit veniam nostrud pariatur ex eiusmod labore deserunt nisi. Nulla enim consequat pariatur occaecat ullamco nostrud voluptate est anim voluptate. Voluptate reprehenderit labore et proident id et mollit irure ut. Dolore ea quis aute tempor ad nostrud ut cillum anim tempor aute reprehenderit. Ea eu sint est fugiat laborum cillum exercitation dolor non eu quis minim minim deserunt. Fugiat aliquip dolor culpa ut mollit mollit enim.</p>
  </div>
)

const App = () => (
  <Router>
    <Navbar />
    <Main />
  </Router>
)

export default App;
