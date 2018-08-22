import { ToursList } from "./ToursList";
import React from "react";
import { shallow } from "enzyme";

describe("<ToursList />", () => {
  test("render", () => {
    const tours = [
      { id: 1, title: "Tour 1" },
      { id: 2, title: "Tour 2" },
      { id: 3, title: "Tour 3" }
    ];
    const listTours = jest.fn();
    const component = shallow(
      <ToursList tours={tours} listTours={listTours} />
    );
    expect(component).toMatchSnapshot();
  });
});
