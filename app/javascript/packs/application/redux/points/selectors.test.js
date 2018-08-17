import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getPoints, isFetching } from "./selectors";

describe("point selectors", () => {
  const state = {
    points: {
      isFetching: false,
      data: {
        "1": { id: 1, title: "Cool Point" },
        "3": { id: 3, title: "Awesome Point" }
      }
    }
  };

  it("getPoints() takes the state and returns a list of all the points as an array", () => {
    expect(getPoints(state)).toEqual([
      { id: 1, title: "Cool Point" },
      { id: 3, title: "Awesome Point" }
    ]);
  });

  it("isFetching() takes the state and returns boolean value for isFetching", () => {
    expect(isFetching(state)).toEqual(false);
  });
});
