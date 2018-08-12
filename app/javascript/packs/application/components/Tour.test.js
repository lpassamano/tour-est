import Tour from "./Tour";
import React from "react";
import { mount } from "enzyme";

describe("<Tour />", () => {
  test("render", () => {
    const component = mount(<Tour />);
    expect(component).toMatchSnapshot();
  });
});
