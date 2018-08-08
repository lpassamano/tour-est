import TourInfo from "./TourInfo";
import React from "react";
import { mount } from "enzyme";

describe("<TourInfo />", () => {
  test("render", () => {
    const component = mount(<TourInfo />);
    expect(component).toMatchSnapshot();
  });
});
