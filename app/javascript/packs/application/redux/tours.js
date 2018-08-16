import api from "../api";
import { keyBy } from "lodash";

// todo; test meeeeee!

export const CREATE_TOUR = "CREATE_TOUR";
export const LIST_TOURS = "LIST_TOURS";
export const LIST_TOURS_SUCCESS = "LIST_TOURS_SUCCESS";
export const LIST_TOURS_ERROR = "LIST_TOURS_ERROR";
export const GET_TOUR = "GET_TOUR";
export const GET_TOUR_SUCCESS = "GET_TOUR_SUCCESS";
export const GET_TOUR_ERROR = "GET_TOUR_ERROR";

export const listTours = () => async dispatch => {
  dispatch({ type: LIST_TOURS });
  const response = await api.listTours();

  if (response.ok) {
    dispatch({ type: LIST_TOURS_SUCCESS, data: keyBy(response.data, "id") });
  } else {
    dispatch({ type: LIST_TOURS_ERROR });
  }
};

export const getTour = tourId => async dispatch => {
  dispatch({ type: GET_TOUR });
  const response = await api.getTour(tourId);

  if (response.ok) {
    dispatch({ type: GET_TOUR_SUCCESS, data: response.data });
  } else {
    dispatch({ type: GET_TOUR_ERROR });
  }
};

export const INITIAL_STATE = {
  isFetching: false,
  data: null
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_TOURS:
      return { ...state, isFetching: true };
    case LIST_TOURS_SUCCESS:
      return { ...state, isFetching: false, data: action.data };
    case LIST_TOURS_ERROR:
      return { ...state, isFetching: false };
    case GET_TOUR:
      return { ...state, isFetching: true };
    case GET_TOUR_SUCCESS:
      // need to store current tour's id only in state (data will be fetched out of the data array)
      return { ...state, isFetching: false };
    case GET_TOUR_ERROR:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

// registerTour = async attributes => {
//   const tourResult = await api.createTour(attributes);
//   // should update state
//   return tourResult;
// };
//
// showTour = async tourId => {
//   // TODO: update getTour so it gets point info too?
//   this.setState({ tour: { isFetching: true, data: null } });
//   const tour = await api.getTour(tourId);
//   this.setState({ tour: { isFetching: false, data: tour.data } });
// };
