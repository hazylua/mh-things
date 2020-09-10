import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";

const render = Component => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render(App)