import { StaffUserDashboard } from "./StaffUserDashboard";
import React from "react";
import { shallow } from "enzyme";

describe("<StaffUserDashboard />", () => {
  test("render", () => {
    const onCreateTour = jest.fn();
    const currentStaffUser = {
      username: "username123",
      id: 1,
      cultural_center: { name: "Penn Museum", id: 1 }
    };
    const tours = {
      isFetching: false,
      data: [
        { id: 1, title: "Tour 1" },
        { id: 2, title: "Tour 2" },
        { id: 3, title: "Tour 3" }
      ]
    };
    const listTours = jest.fn();
    const component = shallow(
      <StaffUserDashboard
        onCreateTour={onCreateTour}
        currentStaffUser={currentStaffUser}
        tours={tours}
        listTours={listTours}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
