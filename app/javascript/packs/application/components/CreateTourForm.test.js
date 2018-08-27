import { CreateTourForm } from "./CreateTourForm";
import React from "react";
import { shallow } from "enzyme";

describe("<CreateTourForm />", () => {
  const setup = ({ onCreateTour = jest.fn() }) => {
    const component = shallow(<CreateTourForm onCreateTour={onCreateTour} />);
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

  test("onSubmit - when create button is clicked the current value of form fields are submitted", () => {
    const onCreateTour = jest.fn();
    onCreateTour.mockResolvedValue({ ok: true, data: { id: 1 } });
    const component = setup({ onCreateTour });

    fillIn(component.find('[name="title"]'), "Greco-Roman Sculpture");
    fillIn(
      component.find('[name="starting_point"]'),
      "Greek and Roman Gallery 3"
    );
    fillIn(
      component.find('[name="directions"]'),
      "Go past the welcome desk and into the hallway to the right"
    );
    fillIn(component.find('[name="estimated_time"]'), "2 hours");
    fillIn(
      component.find('[name="description"]'),
      "This tour focues on sculpture made during the Greek and Roman Empires"
    );
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

  test("handleChange - when text is typed into the title field the state is updated", () => {
    const component = setup({});
    fillIn(component.find('[name="title"]'), "Best Tour Ever!");
    expect(component.state("title")).toEqual("Best Tour Ever!");
  });

  test("render", () => {
    const component = setup({});
    expect(component).toMatchSnapshot();
  });
});
