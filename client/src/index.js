import React from "react";
import { render } from "react-dom";

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import "./index.css";

import App from "./App";

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);