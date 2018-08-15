import api from "../api";

// todo; test meeeeee!

export const CREATE_TOUR = "CREATE_TOUR";
export const LIST_TOURS = "LIST_TOURS";
export const LIST_TOURS_SUCCESS = "LIST_TOURS_SUCCESS";
export const LIST_TOURS_ERROR = "LIST_TOURS_ERROR";
export const GET_TOUR = "GET_TOUR";

export const listTours = () => async dispatch => {
  dispatch({ type: LIST_TOURS });
  const response = await api.listTours();
  if (response.ok) {
    dispatch({ type: LIST_TOURS_SUCCESS, data: response.data });
  } else {
    dispatch({ type: LIST_TOURS_ERROR });
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
// listTours = async () => {
//   this.setState({ tours: { isFetching: true, data: null } });
//   const tourList = await api.listTours();
//   this.setState({ tours: { isFetching: false, data: tourList.data } });
// };
//
// showTour = async tourId => {
//   // TODO: update getTour so it gets point info too?
//   this.setState({ tour: { isFetching: true, data: null } });
//   const tour = await api.getTour(tourId);
//   this.setState({ tour: { isFetching: false, data: tour.data } });
// };
