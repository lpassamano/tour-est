import { UpdateTourForm } from "./UpdateTourForm";
import React from "react";
import { shallow } from "enzyme";

describe("<UpdateTour Form/>", () => {
  const setup = ({ onUpdateTour = jest.fn() }) => {
    const tour = { title: "Tour 1", id: 1 };
    const component = shallow(
      <UpdateTourForm onUpdateTour={onUpdateTour} tourId={"1"} tour={tour} />
    );
    return component;
  };

  const submit = form => {
    form.simulate("submit", { preventDefault: () => null });
  };

  const state = {
    title: "Greco-Roman Sculpture Part 2",
    starting_point: "Greek and Roman Gallery 3",
    directions: "Go past the welcome desk and into the hallway to the right",
    estimated_time: "2 hours",
    description:
      "This tour focues on sculpture made during the Greek and Roman Empires"
  };

  test("onSubmit - when update button is clicked the current value of the form fields are submitted", () => {
    const onUpdateTour = jest.fn();
    onUpdateTour.mockResolvedValue({ ok: true, data: { id: 1 } });
    const component = setup({ onUpdateTour });
    component.setState(state);
    submit(component.find("form"));

    expect(onUpdateTour).toHaveBeenCalledWith({
      tour: {
        id: 1,
        title: "Greco-Roman Sculpture Part 2",
        starting_point: "Greek and Roman Gallery 3",
        directions:
          "Go past the welcome desk and into the hallway to the right",
        estimated_time: "2 hours",
        description:
          "This tour focues on sculpture made during the Greek and Roman Empires"
      }
    });
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
