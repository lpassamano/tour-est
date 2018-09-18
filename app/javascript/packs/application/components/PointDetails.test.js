import { PointDetails } from "./PointDetails";
import React from "react";
import { shallow } from "enzyme";

describe("<PointDetails />", () => {
  const setup = () => {
    const point = {
      title: "First point"
    };
    const isFetching = false;
    const getPoint = jest.fn();
    const component = shallow(
      <PointDetails point={point} getPoint={getPoint} isFetching={isFetching} />
    );
    return component;
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
