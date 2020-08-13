import React from "react";
import ReactDOM from "react-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Scripts
import "jquery/dist/jquery.js";
import "popper.js/dist/umd/popper.js";
import "bootstrap/dist/js/bootstrap.js";

import "./index.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
