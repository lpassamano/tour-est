import TourContainer from "./TourContainer";
import React from "react";
import { mount } from "enzyme";

describe("<TourContainer />", () => {
  test("render", () => {
    const tour = {
      title: "Philly Tour",
      estimated_time: "2 hours",
      description: "Walking tour of Philly's architecture and public art",
      starting_point: "City Hall",
      directions: "Meet at the West entrance"
    };
    const showTour = jest.fn();
    const component = mount(<TourContainer tour={tour} showTour={showTour} />);
    expect(component).toMatchSnapshot();
  });
});
