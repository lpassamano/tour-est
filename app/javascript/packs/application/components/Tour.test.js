import { Tour } from "./Tour";
import React from "react";
import { shallow } from "enzyme";

describe("<Tour />", () => {
  test("render", () => {
    const tour = {
      title: "Philly Tour",
      estimated_time: "2 hours",
      description: "Walking tour of Philly's architecture and public art",
      starting_point: "City Hall",
      directions: "Meet at the West entrance"
    };
    const getTour = jest.fn();
    const component = shallow(<Tour tour={tour} getTour={getTour} />);
    expect(component).toMatchSnapshot();
  });
});
