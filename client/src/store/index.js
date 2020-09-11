import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const store = createStore(reducers, { token: null, user: null, isUserLoggedIn: false }, compose(applyMiddleware(thunk)));

export default store;
