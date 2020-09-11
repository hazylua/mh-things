import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const store = createStore(reducers, { token: null, user: null, isUserLoggedIn: false }, compose(applyMiddleware(thunk)));

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET_TOKEN':
            return state.token = payload;
        case 'REMOVE_TOKEN':
            return state.token = null
        default:
            return state;

    }
}

export default store;
