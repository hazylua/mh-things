import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        MH_THINGS
      </Link>
      <Link className="navbar-item" to="/filter-table">
        Filter Table
      </Link>
      <Link className="navbar-item" to="/set-searcher">
        Set Searcher
      </Link>
    </nav>
  );
};

export default Navbar;
