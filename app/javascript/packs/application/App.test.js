import { App } from "./App";
import React from "react";
import { shallow } from "enzyme";

describe("<App />", () => {
  test("render", () => {
    const authenticateStaffUser = jest.fn();
    const logoutStaffUser = jest.fn();
    const currentStaffUser = {
      id: 1,
      username: "username123",
      cultural_center: { id: 1, name: "MoMA" }
    };

    const component = shallow(
      <App
        authenticateStaffUser={authenticateStaffUser}
        logoutStaffUser={logoutStaffUser}
        currentStaffUser={currentStaffUser}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
