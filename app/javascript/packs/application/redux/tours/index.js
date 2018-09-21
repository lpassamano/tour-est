import { omit } from "lodash";

import {
  CREATE_TOUR,
  CREATE_TOUR_SUCCESS,
  CREATE_TOUR_ERROR,
  UPDATE_TOUR,
  UPDATE_TOUR_SUCCESS,
  UPDATE_TOUR_ERROR,
  LIST_TOURS,
  LIST_TOURS_SUCCESS,
  LIST_TOURS_ERROR,
  GET_TOUR,
  GET_TOUR_SUCCESS,
  GET_TOUR_ERROR,
  DELETE_TOUR,
  DELETE_TOUR_SUCCESS,
  DELETE_TOUR_ERROR
} from "./actions";

import {
  AUTHENTICATE_STAFF_USER_SUCCESS,
  LOG_OUT_STAFF_USER
} from "../staffUser/actions";

export const INITIAL_STATE = {
  isFetching: false,
  data: {}
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TOUR:
    case UPDATE_TOUR:
    case LIST_TOURS:
    case GET_TOUR:
    case DELETE_TOUR:
      return { ...state, isFetching: true };
    case CREATE_TOUR_SUCCESS:
    case UPDATE_TOUR_SUCCESS:
    case GET_TOUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: { ...state.data, ...action.data }
      };
    case DELETE_TOUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: omit(state.data, action.tourId)
      };
    case LIST_TOURS_SUCCESS:
      return {
        isFetching: false,
        data: action.data
      };
    case CREATE_TOUR_ERROR:
    case UPDATE_TOUR_ERROR:
    case LIST_TOURS_ERROR:
    case GET_TOUR_ERROR:
    case DELETE_TOUR_ERROR:
      return { ...state, isFetching: false };
    case AUTHENTICATE_STAFF_USER_SUCCESS:
    case LOG_OUT_STAFF_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
