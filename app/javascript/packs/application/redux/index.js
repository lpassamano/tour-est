import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as staffUser } from "./staffUser";
import { reducer as tours } from "./tours";
import { reducer as points } from "./points";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ staffUser, tours, points });
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
