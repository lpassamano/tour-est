import { TourContainer } from "./TourContainer";
import React from "react";
import { shallow } from "enzyme";

describe("<TourContainer />", () => {
  test("render", () => {
    const tourId = "1";
    const component = shallow(<TourContainer tourId={tourId} />);
    expect(component).toMatchSnapshot();
  });
});
