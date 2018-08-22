import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authenticateStaffUser, logoutStaffUser } from "./actions";
import api from "../../api";

describe("authenticateStaffUser()", () => {
  it("calls the correct dispatch and returns data when successful", async () => {
    const dispatch = jest.fn();
    const user = {
      id: 1,
      username: "user12345",
      cultural_center: { name: "MoMA", id: 1 }
    };

    jest.spyOn(api, "authenticateStaffUser").mockResolvedValue({
      ok: true,
      data: user
    });

    await authenticateStaffUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "AUTHENTICATE_STAFF_USER_SUCCESS",
      data: user
    });
  });

  it("calls the correct dispatach when unsuccessful", async () => {
    const dispatch = jest.fn();

    jest.spyOn(api, "authenticateStaffUser").mockResolvedValue({
      ok: false
    });

    await authenticateStaffUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "AUTHENTICATE_STAFF_USER_ERROR"
    });
  });
});

describe("logoutStaffUser()", () => {
  it("calls the correct dispatch and returns the correct state", () => {
    const dispatch = jest.fn();
    const data = { isFetching: false, data: {} };

    jest.spyOn(api, "removeAuthToken").mockResolvedValue({
      ok: true
    });

    logoutStaffUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "LOG_OUT_STAFF_USER",
      data: data
    });
  });
});
