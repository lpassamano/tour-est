import {
  CREATE_TOUR,
  CREATE_TOUR_SUCCESS,
  CREATE_TOUR_ERROR,
  LIST_TOURS,
  LIST_TOURS_SUCCESS,
  LIST_TOURS_ERROR,
  GET_TOUR,
  GET_TOUR_SUCCESS,
  GET_TOUR_ERROR
} from "./actions";

export const INITIAL_STATE = {
  isFetching: false,
  data: {}
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TOUR:
    case LIST_TOURS:
    case GET_TOUR:
      return { ...state, isFetching: true };
    case CREATE_TOUR_SUCCESS:
    case LIST_TOURS_SUCCESS:
    case GET_TOUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: { ...state.data, ...action.data }
      };
    case CREATE_TOUR_ERROR:
    case LIST_TOURS_ERROR:
    case GET_TOUR_ERROR:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
