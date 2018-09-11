import {
  CREATE_POINT,
  CREATE_POINT_SUCCESS,
  CREATE_POINT_ERROR,
  UPDATE_POINT,
  UPDATE_POINT_SUCCESS,
  UPDATE_POINT_ERROR,
  LIST_POINTS,
  LIST_POINTS_SUCCESS,
  LIST_POINTS_ERROR
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
      return { ...state, isFetching: true };
    case CREATE_POINT_SUCCESS:
    case UPDATE_POINT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: { ...state.data, ...action.data }
      };
    case LIST_POINTS_SUCCESS:
      return {
        isFetching: false,
        data: action.data
      };
    case CREATE_POINT_ERROR:
    case UPDATE_POINT_ERROR:
    case LIST_POINTS_ERROR:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
