import { Tour } from "./Tour";
import React from "react";
import { shallow } from "enzyme";

describe("<Tour />", () => {
  test("render", () => {
    const tour = {
      id: 1,
      title: "Philly Tour",
      estimated_time: "2 hours",
      description: "Walking tour of Philly's architecture and public art",
      starting_point: "City Hall",
      directions: "Meet at the West entrance"
    };
    const getTour = jest.fn();
    const isFetching = false;
    const component = shallow(
      <Tour tour={tour} getTour={getTour} isFetching={isFetching} />
    );
    expect(component).toMatchSnapshot();
  });
});
