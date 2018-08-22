import { navigate } from "@reach/router";
import api from "../../api";
import { INITIAL_STATE } from "./index";

export const AUTHENTICATE_STAFF_USER = "AUTHENTICATE_STAFF_USER";
export const AUTHENTICATE_STAFF_USER_SUCCESS =
  "AUTHENTICATE_STAFF_USER_SUCCESS";
export const AUTHENTICATE_STAFF_USER_ERROR = "AUTHENTICATE_STAFF_USER_ERROR";
export const LOG_OUT_STAFF_USER = "LOG_OUT_STAFF_USER";

export const authenticateStaffUser = () => async dispatch => {
  dispatch({ type: AUTHENTICATE_STAFF_USER });
  const response = await api.authenticateStaffUser();

  if (response.ok) {
    dispatch({
      type: AUTHENTICATE_STAFF_USER_SUCCESS,
      data: response.data
    });
  } else {
    dispatch({ type: AUTHENTICATE_STAFF_USER_ERROR });
  }

  return response;
};

export const logoutStaffUser = () => dispatch => {
  api.removeAuthToken();
  dispatch({ type: LOG_OUT_STAFF_USER, data: INITIAL_STATE });
};
