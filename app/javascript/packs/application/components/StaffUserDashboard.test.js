import StaffUserDashboard from "./StaffUserDashboard";
import React from "react";
import { mount } from "enzyme";

describe("<StaffUserDashboard />", () => {
  test("render", () => {
    const onCreateTour = jest.fn();
    const component = mount(<StaffUserDashboard onCreateTour={onCreateTour} />);
    expect(component).toMatchSnapshot();
  });
});
