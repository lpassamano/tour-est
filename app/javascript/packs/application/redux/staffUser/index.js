import {
  CREATE_STAFF_USER,
  CREATE_STAFF_USER_SUCCESS,
  CREATE_STAFF_USER_ERROR,
  LOG_IN_STAFF_USER,
  LOG_IN_STAFF_USER_SUCCESS,
  LOG_IN_STAFF_USER_ERROR,
  AUTHENTICATE_STAFF_USER,
  AUTHENTICATE_STAFF_USER_SUCCESS,
  AUTHENTICATE_STAFF_USER_ERROR,
  LOG_OUT_STAFF_USER
} from "./actions";

export const INITIAL_STATE = {
  isFetching: false,
  data: null
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_STAFF_USER:
    case LOG_IN_STAFF_USER:
    case AUTHENTICATE_STAFF_USER:
      return { ...state, isFetching: true };
    case AUTHENTICATE_STAFF_USER_SUCCESS:
      return { isFetching: false, data: action.data };
    case CREATE_STAFF_USER_ERROR:
    case LOG_IN_STAFF_USER:
    case AUTHENTICATE_STAFF_USER_ERROR:
      return { ...state, isFetching: false };
    case LOG_OUT_STAFF_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
