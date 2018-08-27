import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as staffUser } from "./staffUser";
import { reducer as tours } from "./tours";
import { reducer as points } from "./points";

const rootReducer = combineReducers({ staffUser, tours, points });
export default createStore(rootReducer, applyMiddleware(thunk));
