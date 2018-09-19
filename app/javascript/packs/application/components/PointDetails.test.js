import { PointDetails } from "./PointDetails";
import React from "react";
import { shallow } from "enzyme";

describe("<PointDetails />", () => {
  const setup = () => {
    const point = {
      title: "First point"
    };
    const isFetching = false;
    const listPoints = jest.fn();
    const getPoint = jest.fn();
    const component = shallow(
      <PointDetails
        point={point}
        listPoints={listPoints}
        isFetching={isFetching}
        getPoint={getPoint}
      />
    );
    return component;
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
