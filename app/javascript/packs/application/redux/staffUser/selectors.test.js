import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getStaffUser } from "./selectors";

describe("staff user selectors", () => {
  const state = {
    staffUser: {
      isFetching: false,
      data: {
        id: 1,
        username: "user1234",
        cultural_center: {
          name: "MoMA",
          id: 1
        }
      }
    }
  };

  it("getStaffUser() takes the state and returns the current staff user", () => {
    expect(getStaffUser(state)).toEqual({
      id: 1,
      username: "user1234",
      cultural_center: {
        name: "MoMA",
        id: 1
      }
    });
  });
});
