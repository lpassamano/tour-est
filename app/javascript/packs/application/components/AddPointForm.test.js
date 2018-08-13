import AddPointForm from "./AddPointForm";
import React from "react";
import { shallow } from "enzyme";

describe("<AddPointForm />", () => {
  test("render", () => {
    const component = shallow(<AddPointForm />);
    expect(component).toMatchSnapshot();
  });
});
