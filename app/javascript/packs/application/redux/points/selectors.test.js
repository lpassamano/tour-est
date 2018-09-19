import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getPoints, isFetching, getNextPoint } from "./selectors";

describe("point selectors", () => {
  const state = {
    points: {
      isFetching: false,
      data: {
        "1": { id: 1, title: "Cool Point", order_key: 0 },
        "3": { id: 3, title: "Awesome Point", order_key: 1 }
      }
    }
  };

  it("getPoints() takes the state and returns a list of all the points as an array", () => {
    expect(getPoints(state)).toEqual([
      state.points.data["1"],
      state.points.data["3"]
    ]);
  });

  it("isFetching() takes the state and returns boolean value for isFetching", () => {
    expect(isFetching(state)).toEqual(false);
  });

  it("getNextPoint() takes the state and current point and returns the next point", () => {
    expect(getNextPoint(state, 1)).toEqual(state.points.data["3"]);
  });

  it("getNextPoint() returns undefined if there is no next point", () => {
    expect(getNextPoint(state, 3)).toEqual(undefined);
  });
});
