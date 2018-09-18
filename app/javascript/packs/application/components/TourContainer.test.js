import TourContainer from "./TourContainer";
import React from "react";
import { shallow } from "enzyme";

describe("<TourContainer />", () => {
  test("render", () => {
    const component = shallow(<TourContainer tourId="1" />);
    expect(component).toMatchSnapshot();
  });
});
