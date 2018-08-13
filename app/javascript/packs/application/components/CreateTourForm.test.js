import CreateTourForm from "./CreateTourForm";
import React from "react";
import { shallow } from "enzyme";

describe("<CreateTourForm />", () => {
  const setup = ({ onCreateTour = jest.fn(), navigate = jest.fn() }) => {
    const currentStaffUser = { id: 1, cultural_center: { id: 1 } };
    const component = shallow(
      <CreateTourForm
        onCreateTour={onCreateTour}
        navigate={navigate}
        currentStaffUser={currentStaffUser}
      />
    );
    return component;
  };

  test("onSubmit - when create button is clicked the current value of form fields are submitted", done => {
    const onCreateTour = jest.fn();
    onCreateTour.mockResolvedValue({ ok: true, data: { id: 1 } });
    const navigate = to => {
      expect(to).toEqual("/tours/1");
      done();
    };
    const component = setup({ onCreateTour, navigate });
    const titleEvent = {
      target: { name: "title", value: "Greco-Roman Sculpture" }
    };
    const startingPointEvent = {
      target: { name: "starting_point", value: "Greek and Roman Gallery 3" }
    };
    const directionsEvent = {
      target: {
        name: "directions",
        value: "Go past the welcome desk and into the hallway to the right"
      }
    };
    const estimatedTimeEvent = {
      target: { name: "estimated_time", value: "2 hours" }
    };
    const descriptionEvent = {
      target: {
        name: "description",
        value:
          "This tour focues on sculpture made during the Greek and Roman Empires"
      }
    };

    component.find("input#title").simulate("change", titleEvent);
    component
      .find("input#starting_point")
      .simulate("change", startingPointEvent);
    component.find("input#directions").simulate("change", directionsEvent);
    component
      .find("input#estimated_time")
      .simulate("change", estimatedTimeEvent);
    component.find("input#description").simulate("change", descriptionEvent);
    component.find("form").simulate("submit", { preventDefault: () => null });

    expect(onCreateTour).toHaveBeenCalledWith({
      tour: {
        title: "Greco-Roman Sculpture",
        staff_user_id: 1,
        cultural_center_id: 1,
        starting_point: "Greek and Roman Gallery 3",
        directions:
          "Go past the welcome desk and into the hallway to the right",
        estimated_time: "2 hours",
        description:
          "This tour focues on sculpture made during the Greek and Roman Empires"
      }
    });
  });

  test("handleChange - when text is typed into the title field the state is updated", () => {
    const component = setup({});
    const event = { target: { name: "title", value: "Best Tour Ever!" } };
    component.find("input#title").simulate("change", event);
    expect(component.state("title")).toEqual("Best Tour Ever!");
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
