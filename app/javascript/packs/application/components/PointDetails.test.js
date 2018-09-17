import { PointDetails } from "./PointDetails";
import React from "react";
import { shallow } from "enzyme";

describe("<PointDetails />", () => {
  const setup = () => {
    const point = {
      title: "First point"
    };
    const component = shallow(<PointDetails point={point} />);
    return component;
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
