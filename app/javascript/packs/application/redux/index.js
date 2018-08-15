import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as tours } from "./tours";

const rootReducer = combineReducers({ tours });
export default createStore(rootReducer, applyMiddleware(thunk));
