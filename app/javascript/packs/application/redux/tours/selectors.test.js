import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getTours, getTour, isFetching } from "./selectors";

describe("tour selectors", () => {
  const state = {
    tours: {
      isFetching: false,
      data: {
        "1": { id: 1, title: "Cool Tour" },
        "3": { id: 3, title: "Awesome Tour" }
      }
    }
  };

  it("getTours() takes the state and returns a list of all the tours as an array", () => {
    expect(getTours(state)).toEqual([
      { id: 1, title: "Cool Tour" },
      { id: 3, title: "Awesome Tour" }
    ]);
  });

  it("getTour() takes the state and a tour id and returns the data for the tour", () => {
    expect(getTour(state, 3)).toEqual({ id: 3, title: "Awesome Tour" });
  });

  it("isFetching() takes the state and returns boolean value for isFetching", () => {
    expect(isFetching(state)).toEqual(false);
  });
});
