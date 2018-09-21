import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  listTours,
  createTour,
  updateTour,
  getTour,
  deleteTour
} from "./actions";
import api from "../../api";
import { navigate } from "@reach/router";

describe("listTours()", () => {
  it("calls the correct dispatch and returns data when successful", async () => {
    const dispatch = jest.fn();
    const tour = { id: 1, title: "Test Tour" };

    jest.spyOn(api, "listTours").mockResolvedValue({
      ok: true,
      data: [tour]
    });

    await listTours()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "LIST_TOURS_SUCCESS",
      data: { [tour.id]: tour }
    });
  });

  it("calls the correct dispatch when unsuccessful", async () => {
    const dispatch = jest.fn();

    jest.spyOn(api, "listTours").mockResolvedValue({
      ok: false
    });

    await listTours()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "LIST_TOURS_ERROR"
    });
  });
});

describe("createTour()", () => {
  it("calls the correct dispatch and returns data when successful", async () => {
    const dispatch = jest.fn();
    const tour = { id: 1, title: "New Tour!" };

    jest.spyOn(api, "createTour").mockResolvedValue({
      ok: true,
      data: tour
    });

    await createTour()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "CREATE_TOUR_SUCCESS",
      data: { [tour.id]: tour }
    });
    expect(navigate).toHaveBeenCalledWith(`/tours/${tour.id}`);
  });

  it("calls the correct dispatch when unsuccessful", async () => {
    const dispatch = jest.fn();

    jest.spyOn(api, "createTour").mockResolvedValue({
      ok: false
    });

    await createTour()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "CREATE_TOUR_ERROR"
    });
  });
});

describe("updateTour()", () => {
  it("calls the correct dispatch and returns data when successful", async () => {
    const dispatch = jest.fn();
    const tour = { id: 1, title: "New Tour!" };

    jest.spyOn(api, "updateTour").mockResolvedValue({
      ok: true,
      data: tour
    });

    await updateTour()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "UPDATE_TOUR_SUCCESS",
      data: { [tour.id]: tour }
    });
    expect(navigate).toHaveBeenCalledWith(`/tours/${tour.id}`);
  });

  it("calls the correct dispatch when unsuccessful", async () => {
    const dispatch = jest.fn();

    jest.spyOn(api, "updateTour").mockResolvedValue({
      ok: false
    });

    await updateTour()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "UPDATE_TOUR_ERROR"
    });
  });
});

describe("getTour()", () => {
  it("calls the correct dispatch and returns data when successful.", async () => {
    const dispatch = jest.fn();
    const tour = { id: 1, title: "Your Tour" };

    jest.spyOn(api, "getTour").mockResolvedValue({
      ok: true,
      data: tour
    });

    await getTour()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "GET_TOUR_SUCCESS",
      data: { [tour.id]: tour }
    });
  });

  it("calls the correct dispatch when unsuccessful", async () => {
    const dispatch = jest.fn();

    jest.spyOn(api, "getTour").mockResolvedValue({
      ok: false
    });

    await getTour()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "GET_TOUR_ERROR"
    });
  });
});

describe("deleteTour()", () => {
  it("calls the correct dispatch and returns data when successful.", async () => {
    const dispatch = jest.fn();
    jest.spyOn(api, "deleteTour").mockResolvedValue({
      ok: true
    });

    await deleteTour()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "DELETE_TOUR_SUCCESS"
    });
  });

  it("calls the correct dispatch when unsuccessful", async () => {
    const dispatch = jest.fn();
    jest.spyOn(api, "deleteTour").mockResolvedValue({
      ok: false
    });

    await deleteTour()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: "DELETE_TOUR_ERROR"
    });
  });
});
