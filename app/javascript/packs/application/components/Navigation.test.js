import Navigation from "./Navigation";
import React from "react";
import { shallow } from "enzyme";

describe("<Navigation />", () => {
  test("render", () => {
    const onLogout = jest.fn();
    const currentStaffUser = {
      username: "leigh_p",
      cultural_center: { id: 1, name: "MoMA" },
      id: 1
    };
    const component = shallow(
      <Navigation onLogout={onLogout} currentStaffUser={currentStaffUser} />
    );
    expect(component).toMatchSnapshot();
  });
});
