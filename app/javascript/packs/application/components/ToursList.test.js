import { ToursList } from "./ToursList";
import React from "react";
import { shallow } from "enzyme";

describe("<ToursList />", () => {
  test("render", () => {
    const culturalCenter = { name: "MoMA" };
    const tours = [
      { id: 1, title: "Tour 1", cultural_center: culturalCenter },
      { id: 2, title: "Tour 2", cultural_center: culturalCenter },
      { id: 3, title: "Tour 3", cultural_center: culturalCenter }
    ];
    const listTours = jest.fn();
    const isFetching = false;
    const component = shallow(
      <ToursList tours={tours} listTours={listTours} isFetching={isFetching} />
    );
    expect(component).toMatchSnapshot();
  });
});
