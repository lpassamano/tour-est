import { omit } from "lodash";

import {
  CREATE_POINT,
  CREATE_POINT_SUCCESS,
  CREATE_POINT_ERROR,
  UPDATE_POINT,
  UPDATE_POINT_SUCCESS,
  UPDATE_POINT_ERROR,
  LIST_POINTS,
  LIST_POINTS_SUCCESS,
  LIST_POINTS_ERROR,
  DELETE_POINT,
  DELETE_POINT_SUCCESS,
  DELETE_POINT_ERROR
} from "./actions";

export const INITIAL_STATE = {
  isFetching: false,
  data: {}
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_POINT:
    case UPDATE_POINT:
    case LIST_POINTS:
    case DELETE_POINT:
      return { ...state, isFetching: true };
    case CREATE_POINT_SUCCESS:
    case UPDATE_POINT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: { ...state.data, ...action.data }
      };
    case DELETE_POINT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: omit(state.data, action.pointId)
      };
    case LIST_POINTS_SUCCESS:
      return {
        isFetching: false,
        data: action.data
      };
    case CREATE_POINT_ERROR:
    case UPDATE_POINT_ERROR:
    case LIST_POINTS_ERROR:
    case DELETE_POINT_ERROR:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
