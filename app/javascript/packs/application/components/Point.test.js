import { Point } from "./Point";
import React from "react";
import { shallow } from "enzyme";

describe("<Point />", () => {
  const setup = () => {
    const point = {
      title: "First point"
    };
    const deletePoint = jest.fn();
    const component = shallow(
      <Point point={point} deletePoint={deletePoint} />
    );
    return component;
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
