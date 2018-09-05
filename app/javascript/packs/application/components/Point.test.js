import { Point } from "./Point";
import React from "react";
import { shallow } from "enzyme";

describe("<Point />", () => {
  const setup = () => {
    const point = {
      point: {
        title: "First point"
      }
    };
    const component = shallow(<Point point={point} />);
    return component;
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
