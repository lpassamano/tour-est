import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  createStaffUser,
  loginStaffUser,
  authenticateStaffUser,
  logoutStaffUser
} from "./actions";
import api from "../../api";

describe("createStaffUser()", () => {
  const data = {
    user: {
      username: "user12345",
      password: "bananafeet",
      password_confirmation: "bananafeet"
    },
    cultural_center: {
      name: "MoMA"
    }
  };

  it("calls the correct dispatch and returns data when successful", async () => {
    const dispatch = jest.fn();
    jest.spyOn(api, "createStaffUser").mockResolvedValue({
      ok: true,
      data: data
    });

    await createStaffUser(data)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "CREATE_STAFF_USER_SUCCESS"
    });
  });

  it("calls the correct dispatch when unsuccessful", async () => {
    const dispatch = jest.fn();
    jest.spyOn(api, "createStaffUser").mockResolvedValue({
      ok: false
    });

    await createStaffUser(data)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "CREATE_STAFF_USER_ERROR"
    });
  });
});

describe("loginStaffUser()", () => {
  const username = "user12345";
  const password = "bananafeet";

  it("calls the correct dispatch and returns data when successful", async () => {
    const dispatch = jest.fn();
    jest.spyOn(api, "login").mockResolvedValue({
      ok: true
    });

    await loginStaffUser(username, password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "LOG_IN_STAFF_USER_SUCCESS"
    });
  });

  it("calls the correct dispatch when unsuccessful", async () => {
    const dispatch = jest.fn();
    jest.spyOn(api, "login").mockResolvedValue({
      ok: false
    });

    await loginStaffUser(username, password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "LOG_IN_STAFF_USER_ERROR"
    });
  });
});

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

  it("calls the correct dispatch when unsuccessful", async () => {
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

    jest.spyOn(api, "removeAuthToken").mockResolvedValue({
      ok: true
    });

    logoutStaffUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "LOG_OUT_STAFF_USER"
    });
  });
});
