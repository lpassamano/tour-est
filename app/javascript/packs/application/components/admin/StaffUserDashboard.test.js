import { StaffUserDashboard } from "./StaffUserDashboard";
import React from "react";
import { shallow } from "enzyme";

describe("<StaffUserDashboard />", () => {
  test("render", () => {
    const currentStaffUser = {
      username: "username123",
      id: 1,
      cultural_center: { name: "Penn Museum", id: 1 }
    };
    const component = shallow(
      <StaffUserDashboard currentStaffUser={currentStaffUser} />
    );
    expect(component).toMatchSnapshot();
  });
});
