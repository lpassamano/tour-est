import ToursList from "./ToursList";
import React from "react";
import { mount } from "enzyme";

describe("<ToursList />", () => {
  test("render", () => {
    const component = mount(<ToursList />);
    expect(component).toMatchSnapshot();
  });
});
