import api from "../api";

export const CREATE_POINT = "CREATE_POINT";
export const LIST_POINTS = "LIST_POINTS";
export const LIST_POINTS_SUCCESS = "LIST_POINTS_SUCCESS";
export const LIST_POINTS_ERROR = "LIST_POINTS_ERROR";
export const GET_POINT = "GET_POINT";

export const listPoints = tourId => async dispatch => {
  dispatch({ type: LIST_POINTS });
  const response = await api.listPoints(tourId);

  if (response.ok) {
    dispatch({ type: LIST_POINTS_SUCCESS, data: response.data });
  } else {
    dispatch({ type: LIST_POINTS_ERROR });
  }
};

export const INITIAL_STATE = {
  isFetching: false,
  data: null
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_POINTS:
      return { ...state, isFetching: true };
    case LIST_POINTS_SUCCESS:
      return { ...state, isFetching: false, data: action.data };
    case LIST_POINTS_ERROR:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
