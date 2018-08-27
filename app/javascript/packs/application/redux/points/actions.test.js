import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { listPoints, createPoint } from "./actions";
import api from "../../api";

describe("listPoints()", () => {
  it("calls the correct dispatch and returns data when successful", async () => {
    const dispatch = jest.fn();
    const point = { id: 1, title: "Test Point" };

    jest.spyOn(api, "listPoints").mockResolvedValue({
      ok: true,
      data: [point]
    });

    await listPoints()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "LIST_POINTS_SUCCESS",
      data: { [point.id]: point }
    });
  });

  it("calls the correct dispatach when unsuccessful", async () => {
    const dispatch = jest.fn();

    jest.spyOn(api, "listPoints").mockResolvedValue({
      ok: false
    });

    await listPoints()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "LIST_POINTS_ERROR"
    });
  });
});

describe("createPoint()", () => {
  it("calls the correct dispatch and returns data when successful", async () => {
    const dispatch = jest.fn();
    const point = { id: 1, title: "New Point!" };

    jest.spyOn(api, "createPoint").mockResolvedValue({
      ok: true,
      data: point
    });

    await createPoint()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "CREATE_POINT_SUCCESS",
      data: { [point.id]: point }
    });
  });

  it("calls the correct dispatach when unsuccessful", async () => {
    const dispatch = jest.fn();

    jest.spyOn(api, "createPoint").mockResolvedValue({
      ok: false
    });

    await createPoint()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "CREATE_POINT_ERROR"
    });
  });
});