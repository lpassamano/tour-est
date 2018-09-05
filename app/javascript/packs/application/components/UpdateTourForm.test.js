import { UpdateTourForm } from "./UpdateTourForm";
import React from "react";
import { shallow } from "enzyme";

describe("<UpdateTour Form/>", () => {
  const setup = () => {
    const tour = { title: "Tour 1", id: 1 };
    const onUpdateTour = jest.fn();
    const isFetching = false;
    const component = shallow(
      <UpdateTourForm
        isFetching={isFetching}
        onUpdateTour={onUpdateTour}
        tour={tour}
        tourId={"1"}
      />
    );
    return component;
  };

  test("render", () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
