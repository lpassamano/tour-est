import {
  AUTHENTICATE_STAFF_USER,
  AUTHENTICATE_STAFF_USER_SUCCESS,
  AUTHENTICATE_STAFF_USER_ERROR,
  LOG_OUT_STAFF_USER
} from "./actions";

export const INITIAL_STATE = {
  isFetching: false,
  data: {}
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE_STAFF_USER:
      return { ...state, isFetching: true };
    case AUTHENTICATE_STAFF_USER_SUCCESS:
    case LOG_OUT_STAFF_USER:
      return { isFetching: false, data: action.data };
    case AUTHENTICATE_STAFF_USER_ERROR:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
