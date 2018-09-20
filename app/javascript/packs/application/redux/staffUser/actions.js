import { navigate } from "@reach/router";
import api from "../../api";

export const CREATE_STAFF_USER = "CREATE_STAFF_USER";
export const CREATE_STAFF_USER_SUCCESS = "CREATE_STAFF_USER_SUCCESS";
export const CREATE_STAFF_USER_ERROR = "CREATE_STAFF_USER_ERROR";
export const LOG_IN_STAFF_USER = "LOG_IN_STAFF_USER";
export const LOG_IN_STAFF_USER_SUCCESS = "LOG_IN_STAFF_USER_SUCCESS";
export const LOG_IN_STAFF_USER_ERROR = "LOG_IN_STAFF_USER_ERROR";
export const AUTHENTICATE_STAFF_USER = "AUTHENTICATE_STAFF_USER";
export const AUTHENTICATE_STAFF_USER_SUCCESS =
  "AUTHENTICATE_STAFF_USER_SUCCESS";
export const AUTHENTICATE_STAFF_USER_ERROR = "AUTHENTICATE_STAFF_USER_ERROR";
export const LOG_OUT_STAFF_USER = "LOG_OUT_STAFF_USER";

export const createStaffUser = attributes => async dispatch => {
  dispatch({ type: CREATE_STAFF_USER });
  const response = await api.createStaffUser(attributes);
  const { username, password } = attributes.user;

  if (response.ok) {
    dispatch({ type: CREATE_STAFF_USER_SUCCESS });
    dispatch(loginStaffUser(username, password));
  } else {
    dispatch({ type: CREATE_STAFF_USER_ERROR });
  }
};

export const loginStaffUser = (username, password) => async dispatch => {
  dispatch({ type: LOG_IN_STAFF_USER });
  const response = await api.login(username, password);

  if (response.ok) {
    dispatch({ type: LOG_IN_STAFF_USER_SUCCESS });
    dispatch(authenticateStaffUser());
    navigate("/admin");
  } else {
    dispatch({ type: LOG_IN_STAFF_USER_ERROR });
  }
};

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
  dispatch({ type: LOG_OUT_STAFF_USER });
  navigate("/login");
};
