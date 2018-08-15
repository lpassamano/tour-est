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

  const fillIn = (input, value) => {
    input.simulate("change", {
      target: { value, name: input.prop("name") }
    });
  };

  const submit = form => {
    form.simulate("submit", { preventDefault: () => null });
  };

  test("onSubmit - when create button is clicked the current value of form fields are submitted", done => {
    const onCreateTour = jest.fn();
    onCreateTour.mockResolvedValue({ ok: true, data: { id: 1 } });
    const navigate = to => {
      expect(to).toEqual("/tours/1");
      done();
    };
    const component = setup({ onCreateTour, navigate });

    fillIn(component.find("input#title"), "Greco-Roman Sculpture");
    fillIn(component.find("input#starting_point"), "Greek and Roman Gallery 3");
    fillIn(
      component.find("input#directions"),
      "Go past the welcome desk and into the hallway to the right"
    );
    fillIn(component.find("input#estimated_time"), "2 hours");
    fillIn(
      component.find("input#description"),
      "This tour focues on sculpture made during the Greek and Roman Empires"
    );
    submit(component.find("form"));

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
    fillIn(component.find("input#title"), "Best Tour Ever!");
    expect(component.state("title")).toEqual("Best Tour Ever!");
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
