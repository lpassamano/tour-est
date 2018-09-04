import api from "../../api";
import { keyBy } from "lodash";
import { navigate } from "@reach/router";

export const CREATE_TOUR = "CREATE_TOUR";
export const CREATE_TOUR_SUCCESS = "CREATE_TOUR_SUCCESS";
export const CREATE_TOUR_ERROR = "CREATE_TOUR_ERROR";
export const UPDATE_TOUR = "UPDATE_TOUR";
export const UPDATE_TOUR_SUCCESS = "UPDATE_TOUR_SUCCESS";
export const UPDATE_TOUR_ERROR = "UPDATE_TOUR_ERROR";
export const LIST_TOURS = "LIST_TOURS";
export const LIST_TOURS_SUCCESS = "LIST_TOURS_SUCCESS";
export const LIST_TOURS_ERROR = "LIST_TOURS_ERROR";
export const GET_TOUR = "GET_TOUR";
export const GET_TOUR_SUCCESS = "GET_TOUR_SUCCESS";
export const GET_TOUR_ERROR = "GET_TOUR_ERROR";
export const DELETE_TOUR = "DELETE_TOUR";
export const DELETE_TOUR_SUCCESS = "DELETE_TOUR_SUCCESS";
export const DELETE_TOUR_ERROR = "DELETE_TOUR_ERROR";

export const createTour = attributes => async dispatch => {
  dispatch({ type: CREATE_TOUR });
  const response = await api.createTour(attributes);

  if (response.ok) {
    dispatch({
      type: CREATE_TOUR_SUCCESS,
      data: { [response.data.id]: response.data }
    });
    navigate(`/tours/${response.data.id}`);
  } else {
    dispatch({ type: CREATE_TOUR_ERROR });
  }
};

export const updateTour = attributes => async dispatch => {
  dispatch({ type: UPDATE_TOUR });
  const response = await api.updateTour(attributes);

  if (response.ok) {
    dispatch({
      type: UPDATE_TOUR_SUCCESS,
      data: { [response.data.id]: response.data }
    });
    navigate(`/tours/${response.data.id}`);
  } else {
    dispatch({ type: UPDATE_TOUR_ERROR });
  }
};

export const listTours = () => async dispatch => {
  dispatch({ type: LIST_TOURS });
  const response = await api.listTours();

  if (response.ok) {
    dispatch({
      type: LIST_TOURS_SUCCESS,
      data: keyBy(response.data, "id")
    });
  } else {
    dispatch({ type: LIST_TOURS_ERROR });
  }
};

export const getTour = tourId => async dispatch => {
  dispatch({ type: GET_TOUR });
  const response = await api.getTour(tourId);

  if (response.ok) {
    dispatch({
      type: GET_TOUR_SUCCESS,
      data: { [response.data.id]: response.data }
    });
  } else {
    dispatch({ type: GET_TOUR_ERROR });
  }
};

export const deleteTour = tourId => async dispatch => {
  dispatch({ type: DELETE_TOUR });
  const response = await api.deleteTour(tourId);

  if (response.ok) {
    dispatch({ type: DELETE_TOUR_SUCCESS });
    listTours();
    navigate("/admin");
  } else {
    dispatch({ type: DELETE_TOUR_ERROR });
  }
};
