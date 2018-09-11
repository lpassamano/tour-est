import api from "../../api";
import { keyBy } from "lodash";
import { navigate } from "@reach/router";

export const CREATE_POINT = "CREATE_POINT";
export const CREATE_POINT_SUCCESS = "CREATE_POINT_SUCCESS";
export const CREATE_POINT_ERROR = "CREATE_POINT_ERROR";
export const UPDATE_POINT = "UPDATE_POINT";
export const UPDATE_POINT_SUCCESS = "UPDATE_POINT_SUCCESS";
export const UPDATE_POINT_ERROR = "UPDATE_POINT_ERROR";
export const LIST_POINTS = "LIST_POINTS";
export const LIST_POINTS_SUCCESS = "LIST_POINTS_SUCCESS";
export const LIST_POINTS_ERROR = "LIST_POINTS_ERROR";
export const GET_POINT = "GET_POINT";

export const createPoint = (tourId, attributes) => async dispatch => {
  dispatch({ type: CREATE_POINT });
  const response = await api.createPoint(tourId, attributes);

  if (response.ok) {
    dispatch({
      type: CREATE_POINT_SUCCESS,
      data: { [response.data.id]: response.data }
    });
  } else {
    dispatch({ type: CREATE_POINT_ERROR });
  }
};

export const updatePoint = (tourId, attributes) => async dispatch => {
  dispatch({ type: UPDATE_POINT });
  const response = await api.updatePoint(tourId, attributes);

  if (response.ok) {
    dispatch({
      type: UPDATE_POINT_SUCCESS,
      data: { [response.data.id]: response.data }
    });
    navigate(`/tours/${tourId}`);
  } else {
    dispatch({ type: UPDATE_POINT_ERROR });
  }
};

export const listPoints = tourId => async dispatch => {
  dispatch({ type: LIST_POINTS });
  const response = await api.listPoints(tourId);

  if (response.ok) {
    dispatch({ type: LIST_POINTS_SUCCESS, data: keyBy(response.data, "id") });
  } else {
    dispatch({ type: LIST_POINTS_ERROR });
  }
};
