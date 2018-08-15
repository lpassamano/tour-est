import Tour from "./Tour";
import React from "react";
import { mount } from "enzyme";

describe("<Tour />", () => {
  test("render", () => {
    const tour = {
      title: "Philly Tour",
      estimated_time: "2 hours",
      description: "Walking tour of Philly's architecture and public art",
      starting_point: "City Hall",
      directions: "Meet at the West entrance"
    };
    const component = mount(<Tour tour={tour} />);
    expect(component).toMatchSnapshot();
  });
});
