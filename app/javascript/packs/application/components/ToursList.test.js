import ToursList from "./ToursList";
import React from "react";
import { mount } from "enzyme";

describe("<ToursList />", () => {
  test("render", () => {
    const tours = [
      { id: 1, title: "Tour 1" },
      { id: 2, title: "Tour 2" },
      { id: 3, title: "Tour 3" }
    ];
    const component = mount(<ToursList tours={tours} />);
    expect(component).toMatchSnapshot();
  });
});
