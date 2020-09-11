import React from "react";
import ReactDOM from "react-dom";
import store from "./store"
import { Provider } from "react-redux"

import "./index.css";

import App from "./App";

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode >
    </Provider>,
    document.getElementById("root")
  );
}

render(App)