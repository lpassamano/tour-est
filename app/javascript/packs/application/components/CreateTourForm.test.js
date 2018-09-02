import { CreateTourForm } from "./CreateTourForm";
import React from "react";
import { shallow } from "enzyme";

describe("<CreateTourForm />", () => {
  const setup = ({ onCreateTour = jest.fn() }) => {
    const component = shallow(<CreateTourForm onCreateTour={onCreateTour} />);
    return component;
  };

  const submit = form => {
    form.simulate("submit", { preventDefault: () => null });
  };

  const state = {
    title: "Greco-Roman Sculpture",
    starting_point: "Greek and Roman Gallery 3",
    directions: "Go past the welcome desk and into the hallway to the right",
    estimated_time: "2 hours",
    description:
      "This tour focues on sculpture made during the Greek and Roman Empires"
  };

  test("onSubmit - when save buttn is clicked the current value of the form fields are submitted", () => {
    const onCreateTour = jest.fn();
    onCreateTour.mockResolvedValue({ ok: true, data: { id: 1 } });
    const component = setup({ onCreateTour });
    component.setState(state);
    submit(component.find("form"));

    expect(onCreateTour).toHaveBeenCalledWith({
      tour: {
        title: "Greco-Roman Sculpture",
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
