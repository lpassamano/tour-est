import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { listTours } from "./actions";
import api from "../../api";

describe("listTours()", () => {
  it("works", async () => {
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
});
